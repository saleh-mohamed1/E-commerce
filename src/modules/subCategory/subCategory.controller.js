import slugify from "slugify";
import {SubCategory} from "../../../database/model/subCategory.model.js";
import { catchErorr } from "../../middleware/catchErorr.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { deleteOne } from "../../refactor/deleteOne.js";
import { ApiFeature } from "../../utils/apiFeatures.js";




const addSubCategory = catchErorr(async(req,res)=>{
    req.body.createdBy = req.user._id
    req.body.slug =slugify(req.body.name)
    let subCategory = new SubCategory(req.body)    
    console.log(req.body);    
    await subCategory.save()
    res.json({message:"Success For Add",subCategory})
})
const getAllSubCategory =catchErorr( async(req,res)=>{
    let fileFilter = {}
    if (req.params.category) fileFilter.category = req.body.category 
    let apiFeature = new ApiFeature(Category.find(fileFilter),req.query)
    .pagination().selectField().search().sort().filter()
    let SubCategories = await apiFeature.mongoosequery
    res.json({message:"Success For Get All SubCategories",pageNumber:apiFeature.pageNumber,SubCategories})

})
const getSubCategory = catchErorr(async(req,res)=>{
    let SubCategory = await SubCategory.findById(req.params.id)
    SubCategory || next(new AppErorr('categorryId Not Found'),404)
    !SubCategory ||res.json({message:"Success For Get SubCategory",SubCategory})
})
const updateSubCategory =catchErorr( async(req,res)=>{
    let UpdateSubCategory = await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    UpdateSubCategory || next(new AppErorr('categorryId Not Found'),404)
    !UpdateSubCategory ||res.json({message:"Success For Update SubCategory",UpdateSubCategory})
})
const deleteSubCategory = deleteOne(SubCategory,'SubCategory')



export{
    addSubCategory,
    getAllSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
    
}