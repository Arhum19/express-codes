const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
let currentuser;


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

const users = [
  { username: "arhum", password: "123", role: "admin" },
  { username: "bassam", password: "456", role: "user" },
];

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Home Page" });
});

app.get("/login", (req, res) => {
  res.json({ message: "Please login", error: null });
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

    res.json({ message: "Login successful", error: false });
  } else {
    res.json({ message: "Invalid username or password", error: true });
  }
});


app.get("/dashboard", (req, res) => {
  const userdata = req.cookies.UserData ? JSON.parse(req.cookies.UserData) : null;
  const currentuser = userdata ? userdata.username : null;
  if (currentuser) {
    return res.json({ message: `Welcome to your dashboard, Name: ${currentuser} | Role: ${userdata.role}` });
  }else{
    return res.json({ message: "Please login to access the dashboard", error: true });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("UserData");
  res.json({ message: "You have been logged out", error: false });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
