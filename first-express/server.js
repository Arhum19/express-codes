const express = require("express");
const app = express();
let names = [
  { id: 1, name: "arhum" },
  { id: 2, name: "ali" },
  { id: 3, name: "ahmed" },
  { id: 4, name: "ahsan" },
];
//home
app.get("/", (req, res) => {
  res.send("Hello From Express!!");
});

//all users
app.get("/users", (req, res) => {
  let user = names.map((a) => a.name);
  res.send(user);
});

//get user from id 
app.get("/user/:id", (req, res) => {
  const user = names.find((n) => n.id === parseInt(req.params.id));
  if (user) {
    res.send(`Hello ${user.name} From Express!!`);
  } else {
    res.status(404).send("User not found");
  }
});
//user from name
app.get("/about/:name", (req, res) => {
  const user = names.find((n) => n.name === req.params.name);
  if (user) {
    res.send(`My name is ${user.name}!!`);
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


