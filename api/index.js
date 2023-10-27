import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("db connected succesfully!")
}).catch((e)=>{
    console.log(e)
})


const app = express()

app.listen(3000, ()=>{
    console.log("port is running on 3000!")
})

app.get("/", (req, res)=>{
    res.send("Hello, How are you?")
})