import { Review } from "../../../database/model/review.model.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { catchErorr } from "../../middleware/catchErorr.js";
import { deleteOne } from "../../refactor/deleteOne.js";




const AddReview = catchErorr(async(req,res,next)=>{
    req.body.user = req.user._id
    const existUserForComments = await Review.findOne({user:req.user._id,product:req.body.product})
    if (existUserForComments) {
        return next(new AppErorr('You have Created Comment Before'),409)
    }
    let review = new Review(req.body)
    await review.save()
    res.json({message:"Success For Add",review})
})
const GetAllReviews =catchErorr( async(req,res)=>{
    let review = await Review.find().populate('user','name')
    res.json({message:"Success For Get All review",review})

})
const getReview = catchErorr(async(req,res,next)=>{
    let review = await Review.findById(req.params.id)
    review || next(new AppErorr('reviewId Not Found'),404)
    !review ||res.json({message:"Success For Get Review",review})
})
const UpdateReview =catchErorr( async(req,res,next)=>{
    let UpdateReview = await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    UpdateReview || next(new AppErorr('ReviewId Not Found Or Not Created Comments'),404)
    !UpdateReview ||res.json({message:"Success For Update Review",UpdateReview})
})
const DeleteReview = catchErorr( async(req,res,next)=>{
    let UpdateReview = await Review.findOneAndDelete({_id:req.params.id,user:req.user._id},req.body,{new:true})
    UpdateReview || next(new AppErorr('ReviewId Not Found Or Not Created Comments'),404)
    !UpdateReview ||res.json({message:"Success For Delete Review",UpdateReview})
})




export {
    AddReview, DeleteReview, GetAllReviews,
    getReview,
    UpdateReview
};
