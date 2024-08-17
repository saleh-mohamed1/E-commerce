import { Category } from "../../../database/model/category.model.js"



export const findCategoryId =async(req,res,next)=>{
    let findCategory = await Category.findById(req.body.category)
    if (findCategory) {
        return next()
    }else{
        return next(new AppErorr('ID Category Not Found'),409)
    }
}