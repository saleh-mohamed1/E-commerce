import { AppErorr } from "./AppErorr.js"


export const catchErorr = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=> next(new AppErorr(err,500)))
    }
} 