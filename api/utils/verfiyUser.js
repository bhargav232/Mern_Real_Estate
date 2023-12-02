// we re creating this function to verify the user, which user we are verifying, for this we need cookie and we get cookie from local storage
import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js";
export const verfiyToken = (req,res,next) =>{
   const token = req.cookies.access_token;
   if(!token){
        return next(errorHandler(401, "unauthorized"))
   }
   jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
    if(err) return next(errorHandler(403, "Forbidden"));

    req.user = user
    next();
   })
}