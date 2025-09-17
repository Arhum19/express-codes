const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);
//middle to set layout
app.set("layout", "main");

// sample data
let user = {
  name: "Arhum Noor",
  age: 30,
  city: "Karachi Pakistan",
  isactive: true,
};
let userlang = ["JavaScript", "Python", "C++", "Java"];
let admin = [{ adminname: "Bassam", isadmin: false }];

//middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// home route
app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

// about route
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});
// variable route
app.get("/variable", (req, res) => {
  res.render("variable", { title: "Variable Page", users: [user], admins: admin, userlang: userlang });
});

// contact route
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

//contact form route
app.post("/contact", (req, res) => {
  console.log("Form has been submitted also shown in web console", req.body);
  res.render("contact-show", { title: "Contact Us", form: req.body });
});

// 404 route
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page Not Found" });
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
