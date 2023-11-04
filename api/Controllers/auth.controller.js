import { MongooseError } from "mongoose"
import User from "../Modles/User.Model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
export const signup = async(req,res,next) =>
{
    const {username, email, password } = req.body
    const hpwd = bcryptjs.hashSync(password,10)
    const newUser  = new User({username, email, password: hpwd})
    try{
   await newUser.save()
   res.status(201).json("user created successfully!");
   } catch(error){

    next(error)
    //console.log(error)
   }
}

export const signin = async(req,res,next) => 
{
  const{email, password} = req.body
  try{

    const validUser = await User.findOne({email})
    if(!validUser){

       return next(errorHandler(404, "User not found in database!"));
    }
    const validPassword = bcryptjs.compareSync(password , validUser.password)
    if(!validPassword){

       return next(errorHandler(401, "Invalid credentials!"))
    }
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
    const {password: pass, ...rest} = validUser._doc; // not send password
    res.cookie("access_token", token, {httpOnly: true})
    .status(200)
    .json(rest)
  }
  // if both email and password are correct then we need to authnticate by token!
  // here we use jwt token
  catch(e) {
    next(e);

  }
}


