import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

mongoose.connect("mongodb+srv://bhargav:bhargav@mern-estate.3ie5cll.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("db connected succesfully!")
}).catch((e)=>{
    console.log(e)
})


const app = express()

app.listen(3000, ()=>{
    console.log("port is running on 3000!")
})