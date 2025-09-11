const express = require("express")
const app = express();
let name = "Arhum Noor";
app.get("/", (req,res)=>{
    res.send("Hello From Express!!");
})
app.get("/user", (req,res)=>{
    res.send(`Hello ${name} From Express!!`);
})
app.get("/about", (req,res)=>{
    res.send("My name is Muhammad Arhum!!");
})

app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000");
    
})