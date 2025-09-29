const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
let currentuser;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const users = [
  { username: "arhum", password: "123", role: "admin" },
  { username: "bassam", password: "456", role: "user" },
];

app.get("/", (req, res) => {
  res.render("home", { error: null });
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const userfind = users.find((user) => {
    return user.username === username && user.password === password;
  });

  res.cookie("UserData", JSON.stringify({ username, role: userfind.role }), {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "strict",
  });

  if (userfind) {
    currentuser = userfind.username;
    res.redirect("/dashboard");
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
});

app.get("/dashboard", (req, res) => {
  if (!currentuser) {
    return res.redirect("/login");
  }
  res.render("dashboard", { username: currentuser });
});

app.get("/logout", (req, res) => {
  currentuser = null;
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
