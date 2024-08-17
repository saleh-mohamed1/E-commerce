import slugify from "slugify";
import { Category } from "../../../database/model/category.model.js"
import { catchErorr } from "../../middleware/catchErorr.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { deleteOne } from "../../refactor/deleteOne.js";
import fs from 'fs';
import { fileURLToPath } from "url";
import { ApiFeature } from "../../utils/apiFeatures.js";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const addCategory = catchErorr(async(req,res)=>{
    req.body.slug =slugify(req.body.name,'&')
    req.body.image = req.file.filename
    req.user.userId = req.body.createdBy
    let category = new Category(req.body)
    await category.save()
    res.json({message:"Success For Add",category})
})
const getAllCategory =catchErorr( async(req,res)=>{
    let apiFeature = new ApiFeature(Category.find(),req.query).pagination().selectField().search(Category.name).sort().filter()
    let category = await apiFeature.mongoosequery 
    
    res.json({message:"Success For Get All Categories",pageNumber : apiFeature.pageNumber,category})

})
const getCategory = catchErorr(async(req,res)=>{
    let category = await Category.findById(req.params.id)
    category || next(new AppErorr('categorryId Not Found'),404)
    !category ||res.json({message:"Success For Get Category",category})
})
const updateCategory =catchErorr( async(req,res,next)=>{
    
    let category = await Category.findById(req.params.id);
    if (!category) return next(new AppErorr('CategoryId Not Found', 404));
    if (req.file) {
        let oldImageOfCategory = path.basename(category.image);
        const oldImagePath = path.join(__dirname, '../../../uploads/category/', oldImageOfCategory);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); 
        }
        req.body.image = req.file.filename; 
    }
    if (req.body.name)  req.body.slug = slugify(req.body.name); 
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) return next(new AppErorr('CategoryId Not Found', 404));
    res.json({ message: "Success For Update Category", updatedCategory });
})





const delteCategory = deleteOne(Category,'Category')




export{
    addCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    delteCategory
}