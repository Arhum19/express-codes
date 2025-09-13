const express = require("express");
const app = express();
app.use(express.json()); //middleware
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

app.post("/user", (req, res) => {
  const user = {
    id: names.length + 1,
    name: req.body.name,
  };
  names.push(user);
  res.send("user added successfully");
});

// app.put("/user/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = names.find((n) => n.id === id);
//   if (!user) return res.status(404).send("User not found");

//   user.name = req.body.name;
//   res.send("User updated successfully");
// });

app.listen(3000, () => {  
  console.log("Server is running on port http://localhost:3000");
});