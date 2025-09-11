const express = require("express");
const app = express();
let names = [
  { id: 1, name: "Arhum" },
  { id: 2, name: "Ali" },
  { id: 3, name: "Ahmed" },
  { id: 4, name: "Ahsan" },
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
app.get("/user/:value", (req, res) => {
  const value = req.params.value.toLowerCase();

  let user = names.find((n) => n.id === parseInt(value)); // check by id
  if (!user) {
    user = names.find((n) => n.name.toLowerCase() === value); // check by name
  }

  user
    ? res.json(`Hello ${user.name} From Express!!`)
    : res.status(404).send("User not found");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
