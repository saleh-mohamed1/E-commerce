import { User } from "../../../database/model/user.model.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { catchErorr } from "../../middleware/catchErorr.js";
import { deleteOne } from "../../refactor/deleteOne.js";
import { ApiFeature } from "../../utils/apiFeatures.js";




const AddUser = catchErorr(async(req,res)=>{
    let user = new User(req.body)
    await user.save()
    res.json({message:"Success For Add",User})
})
const GetAllUsers =catchErorr( async(req,res)=>{
    let apiFeature = new ApiFeature(User.find(),req.query)
    .pagination().selectField().search().sort().filter()

    let Users = await apiFeature.mongoosequery
    // let Users = await User.find()
    res.json({message:"Success For Get All Users",Users})

})
const getUser = catchErorr(async(req,res)=>{
    let user = await User.findById(req.params.id)
    User || next(new AppErorr('UserId Not Found'),404)
    !User ||res.json({message:"Success For Get User",user})
})
const UpdateUser =catchErorr( async(req,res,next)=>{
    let UpdateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})

    UpdateUser || next(new AppErorr('UserId Not Found'),404)
    !UpdateUser ||res.json({message:"Success For Update User",UpdateUser})
})
const deleteUser = deleteOne(User,'User')




export {
    AddUser, deleteUser, GetAllUsers,
    getUser,
    UpdateUser
};
