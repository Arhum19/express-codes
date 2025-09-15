const users = [
  { id: 1, name: "Arhum" },
  { id: 2, name: "Ali" },
  { id: 3, name: "Ahmed" },
  { id: 4, name: "Ahsan" },
];
const userrouter = require("express").Router();

userrouter.get("/", (req, res) => {
  res.json(users);
});
userrouter.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});
userrouter.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = userrouter;