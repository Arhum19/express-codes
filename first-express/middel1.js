const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//1. built in middleware
app.use(express.json());
app.use(express.static("public"));

//2. third party middleware
app.use(cors());
app.use(morgan("tiny"));

//3. custom middleware
app.use((req, res, next) => {
  app.requestTime = new Date().toISOString();
  console.log("Request Time:", app.requestTime);
  next();
});


app.get("/about", (req, res) => {
  res.send("Hello From Express!!");
});

//4. application level middleware
app.get("/admin", (req, res, next) => {
  console.log("Admin Middleware Called");
  next();
}, (req, res) => {
  res.send("Hello Admin, Welcome to the admin page.");
}
);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
