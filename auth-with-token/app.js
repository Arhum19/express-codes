const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
let currentuser;

app.set("view engine", "ejs");
dotenv.config();

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

const User = mongoose.model("User", userSchema);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//home route
app.get("/", (req, res) => {
  res.render("home", { error: null });
});

//register route
app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

//register logic
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    const hashpass = await bcrypt.hash(password, 10);
    if (existingUser) {
      return res.render("register", { error: "User already exists" });
    }
    const createdUser = await User.create({
      username,
      password: hashpass,
      role,
    });
    if (createdUser) {
      return res.redirect("/login");
    }
  } catch (err) {
    console.error("Error occurred during registration:", err);
    return res.render("register", { error: "Internal server error" });
  }
});

//login route
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      // User not found
      return res.render("login", { error: "Invalid username or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Wrong password
      return res.render("login", { error: "Invalid password" });
    }

    //token logic
    const payload = {
      username: user.username,
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.Token_key, { expiresIn: "1h" });

    return res.redirect("/dashboard");
  } catch (err) {
    console.error("Error during login:", err);
    return res.render("login", { error: "Something went wrong. Try again." });
  }
});

// Dashboard route
app.get("/dashboard", (req, res) => {
  if (userdata) {
    return res.render("dashboard", {
      username: userdata.username,
      role: userdata.role,
    });
  }

  // If no cookie, force login
  return res.redirect("/login");
});

// Admin route
app.get("/admin", (req, res) => {
  if (userdata && userdata.role === "admin") {
    return res.render("admin", { username: userdata.username });
  }

  // If not logged in or not admin, force login
  return res.redirect("/login");
});

//logout route
app.get("/logout", (req, res) => {
  res.redirect("/login");
});

//starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
