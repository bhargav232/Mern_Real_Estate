import { MongooseError } from "mongoose"
import User from "../Modles/User.Model.js"
export const signup = async(req,res,next) =>
{
    const {username, email, password } = req.body
    const newUser  = new User({username, email, password})
    try{
   await newUser.save()
   res.status(201).json("user created successfully!");
   } catch(error){
    //res.status(500).json(error.message);
    next(error)
    //console.log(error)
   }
}