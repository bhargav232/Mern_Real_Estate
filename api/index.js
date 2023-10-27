import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import userrouter from "./Routes/User.route.js"
import signuprouter from "./Routes/auth.route.js";

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

app.use(express.json());

app.use("/api/user", userrouter)
app.use("/api/auth", signuprouter )
