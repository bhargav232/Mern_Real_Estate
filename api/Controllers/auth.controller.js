import { MongooseError } from "mongoose"
import User from "../Modles/User.Model.js"
import bcrypt from "bcryptjs"
export const signup = async(req,res,next) =>
{
    const {username, email, password } = req.body
    const hpwd = bcrypt.hashSync(password,10)
    const newUser  = new User({username, email, password: hpwd})
    try{
   await newUser.save()
   res.status(201).json("user created successfully!");
   } catch(error){
    
    next(error)
    //console.log(error)
   }
}