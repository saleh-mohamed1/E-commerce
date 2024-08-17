import jwt from "jsonwebtoken";

import { AppErorr } from "./appError.js";
export const verifyToken = async(req,res,next)=>{
    let {token}= req.headers
    jwt.verify(token , `MyVerifyTokenToE-Commerce`,(err,decodeToken)=>{
        if (err) return next(new AppErorr(err.message,409))
            req.user = decodeToken
            next()
    })
    
}

