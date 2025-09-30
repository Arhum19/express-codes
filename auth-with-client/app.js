const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
let currentuser;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
  const userfind = users.find(
    (user) => user.username === username && user.password === password
  );

  if (userfind) {
    res.cookie("UserData", JSON.stringify({ username, role: userfind.role }), {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.redirect("/dashboard");
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
});


app.get("/dashboard", (req, res) => {
  const userdata = req.cookies.UserData ? JSON.parse(req.cookies.UserData) : null;
  const currentuser = userdata ? userdata.username : null;
  if (currentuser) {
    return res.render("dashboard", { username: currentuser });
  }else{
    return res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("UserData");
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
