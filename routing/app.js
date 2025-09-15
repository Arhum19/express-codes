const express = require("express");
const app = express();
const userrouter = require("./users");
const postrouter = require("./posts");

app.get("/", (req, res) => {
  res.send("Hello From Express!!");
}
);

app.use("/users", userrouter);
app.use("/posts", postrouter);







app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});