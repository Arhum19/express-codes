const express = require("express");
const app = express();

app.use((req, res, next) => {
  const error = new Error("Simulated error");
  next(error);
});

app.get("/", (req, res) => {
  res.send("Hello From Express!!");
});

app.get("/users", (req, res) => {
  res.send(["Arhum", "Ali", "Ahmed", "Ahsan"]);
});

app.use((err, req, res, next) => {
  console.log("Error:", err.message);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
