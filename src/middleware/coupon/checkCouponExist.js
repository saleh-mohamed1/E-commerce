import { Coupon } from "../../../database/model/coupon.model.js";
import { AppErorr } from "../AppErorr.js";
import { catchErorr } from "../catchErorr.js";




export const checkCouponExist = catchErorr(async(req,res,next)=>{
    let isExist  = await Coupon.findOne({code:req.body.code})
    if (!isExist) return next()
        return next(new AppErorr('Coupon Already Exist',409))

}) 