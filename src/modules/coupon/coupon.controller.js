import { catchErorr } from "../../middleware/catchErorr.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { deleteOne } from "../../refactor/deleteOne.js";
import { Coupon } from "../../../database/model/coupon.model.js";


import cron from "node-cron";
cron.schedule('0 0  * * *', 
    // Schedule a task to run every day at midnight
    async () => {
        try{
        const now = Date.now();
        // Delete coupons where the expiration date has passed
        await Coupon.deleteMany({ expires: { $lt: now } });
        console.log('Expired coupons removed.');
    } catch (error) {
        console.error('Error removing expired coupons:', error);
    }
    }
)
const AddCoupon = catchErorr(async(req,res)=>{
    let coupon = new Coupon({
        code:req.body.code,
        expires:req.body.expires,
        disCount :req.body.disCount
    })
    await coupon.save()
    res.json({message:"Success For Add",coupon})
})
const GetAllCoupons =catchErorr( async(req,res)=>{
    let Coupons = await Coupon.find()
    res.json({message:"Success For Get All Coupons",Coupons})

})
const getCoupon = catchErorr(async(req,res)=>{
    let coupon = await Coupon.findById(req.params.id)
    coupon || next(new AppErorr('couponId Not Found'),404)
    !coupon ||res.json({message:"Success For Get coupon",coupon})
})
const UpdateCoupon =catchErorr( async(req,res)=>{
    
    let UpdateCoupons = await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})

    UpdateCoupons || next(new AppErorr('CouponId Not Found'),404)
    !UpdateCoupons ||res.json({message:"Success For Update Coupon",UpdateCoupons})
})
const DelteCoupon = deleteOne(Coupon,'Coupon')




export{
    AddCoupon,
    GetAllCoupons,
    getCoupon,
    UpdateCoupon,
    DelteCoupon
    
}