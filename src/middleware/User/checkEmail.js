import { User } from "../../../database/model/user.model.js"
import { AppErorr } from "../AppErorr.js"



export const checkEmailExist = async(req,res,next)=>{
    let isExist = await User.findOne({email:req.body.email})
    if (!isExist) return next()
        next(new AppErorr('Email Already Exist',409))
}
