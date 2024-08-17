import { User } from "../../../database/model/user.model.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { catchErorr } from "../../middleware/catchErorr.js";




const AddToWishList =catchErorr( async(req,res,next)=>{
    console.log(req.user._id);
    
    let WishList = await User.findByIdAndUpdate(req.user._id,
        {$addToSet:{wishList:req.body.product}},{new:true})

   WishList || next(new AppErorr('WishList Not Found'),404)
   !WishList ||res.json({message:"Success For Add To WishList",wishList:WishList.wishList})
})

const RemoveFromWishList =catchErorr( async(req,res,next)=>{
    
    let WishList = await User.findByIdAndUpdate(req.user._id,
        /*
        pop remove last one  for array
        pull remove specific last one  for array
        */
        {$pull:{wishList:req.params.id}},{new:true})

   WishList || next(new AppErorr('WishList Not Found'),404)
   !WishList ||res.json({message:"Success For Update WishList",wishList:WishList.wishList})
})
const getLoggedUserFromWishList =catchErorr( async(req,res,next)=>{
    
    let WishList = await User.findById(req.user._id).populate('wishList')
   WishList || next(new AppErorr('WishList Not Found'),404)
   !WishList ||res.json({message:"Success For Update WishList",wishList:WishList.wishList})
})




export {

    AddToWishList,
    RemoveFromWishList,
    getLoggedUserFromWishList
};
