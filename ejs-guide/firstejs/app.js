const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "firstejs", "views"));

let user = {
  name: "Arhum Noor",
  age: 30,
  city: "Karachi Pakistan",
  isactive: true,
};

//middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

// about route
app.get("/about", (req, res) => {
  res.render("about");
});
// variable route
app.get("/variable", (req, res) => {
  res.render("variable", { users: [user] });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
