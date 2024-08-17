import slugify from "slugify";
import { Brand } from "../../../database/model/brand.model .js";
import { catchErorr } from "../../middleware/catchErorr.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { deleteOne } from "../../refactor/deleteOne.js";
import { ApiFeature } from "../../utils/apiFeatures.js";

import path, { dirname } from "path";
import fs from 'fs';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const AddBrand = catchErorr(async(req,res)=>{
    req.body.logo = req.file.filename
    console.log(req.file);
    console.log(req.file.filename);
    console.log(req.body.logo);
    
    req.body.createdBy = req.user._id
    req.body.slug =slugify(req.body.name)
    let brand = new Brand(req.body)
    await brand.save()
    res.json({message:"Success For Add",brand})
})
const GetAllBrands =catchErorr( async(req,res)=>{
    let apiFeature = new ApiFeature(Brand.find(),req.query)
    .pagination().selectField().search().sort().filter()

    let brands = await apiFeature.mongoosequery
    // let brands = await Brand.find()
    res.json({message:"Success For Get All Brands",brands})

})
const getBrand = catchErorr(async(req,res)=>{
    let brand = await Brand.findById(req.params.id)
    brand || next(new AppErorr('BrandId Not Found'),404)
    !brand ||res.json({message:"Success For Get Brand",brand})
})
const UpdateBrand =catchErorr( async(req,res)=>{
    let brand = await Brand.findById(req.params.id);
    if (!brand) return next(new AppErorr('brandId Not Found', 404));
    if(req.body.slug) req.body.slug = slugify(req.body.name)
        if (req.file) {
            let oldImageOfBrand = path.basename(brand.logo);
            const oldImagePath = path.join(__dirname, '../../../uploads/brand/', oldImageOfBrand);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); 
            }
            console.log(oldImagePath);
            
            req.body.logo = req.file.filename; 
        }
    // if(req.file) req.body.logo = req.file.fileName
        console.log(req.body);
        console.log(req.file);
        
    return '1'
    let UpdateBrand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})

    UpdateBrand || next(new AppErorr('BrandId Not Found'),404)
    !UpdateBrand ||res.json({message:"Success For Update Brand",UpdateBrand})
})
const DelteBrand = deleteOne(Brand,'Brand')




export{
    AddBrand,
    GetAllBrands,
    getBrand,
    UpdateBrand,
    DelteBrand
    
}