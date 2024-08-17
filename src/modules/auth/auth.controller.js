import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../database/model/user.model.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { catchErorr } from "../../middleware/catchErorr.js";

const signup = catchErorr(async(req,res,next)=>{
    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET)
    return res.json({message:'success',token})
})
const signin = catchErorr(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if (user && bcryptjs.compareSync(req.body.password,user.password)  ){
        let token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET)
        return res.json({message:'success',token})
    }
    next(new AppErorr('Incorrect Email Or Password',404))
    
})
const changeUserPassword = catchErorr(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if (user && bcryptjs.compareSync(req.body.oldPassword,user.password)  ){
        let user = await User.findOneAndUpdate(
            //find By Email
            {email:req.body.email},
            //updeta Passwoed And passwordChangedAt 
            {password:req.body.newPassword,passwordChangedAt:Date.now()})
        let token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET)
        return res.json({message:'success',token})
    }
    next(new AppErorr('Incorrect Email Or Password',404))
})
const ProtectAllRoutes = catchErorr(async(req,res,next)=>{
    let { token} = req.headers
    if (!token) return next(new AppErorr('Token Not Provided',401))
        let userPayload = null
    jwt.verify(token,'mySecretSigninToGetMyLogin',(err,payload)=>{
        if (err) return next(new AppErorr(err,401))
            userPayload = payload
    })
    
    let user = await User.findById(userPayload.userId)
    if (!user) return next(new AppErorr('User Not Found',401))
        console.log('iatttt',userPayload.iat);
        console.log('password user',user?.passwordChangedAt);
        if (user.passwordChangedAt) {
            let time = parseInt(user.passwordChangedAt.getTime() / 1000)        
            if (time >userPayload.iat) return next(new AppErorr('Invalid Token Login Again.....',401))
        }
        req.user = user
        next()
})
const authForAdminOrUser = (...roles)=>{
    return catchErorr(async(req,res,next)=>{
        if (roles.includes(req.user.role))   return next()
            return next(new AppErorr('UnOthreized for this end point.....',401))
    })
    
}

export {
    authForAdminOrUser, changeUserPassword,
    ProtectAllRoutes, signin,
    signup
};

