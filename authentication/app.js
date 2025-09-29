const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const users = [
  { username: "arhum", password: "1234", role: "admin" },
  { username: "bassam", password: "456", role: "user" },
];

app.get("/", (req, res) => {
  res.render("home", { error: null });
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
