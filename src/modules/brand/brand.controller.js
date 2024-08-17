import slugify from "slugify";
import { Brand } from "../../../database/model/brand.model .js";
import { catchErorr } from "../../middleware/catchErorr.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { deleteOne } from "../../refactor/deleteOne.js";
import { ApiFeature } from "../../utils/apiFeatures.js";




const AddBrand = catchErorr(async(req,res)=>{
    let brand = new Brand(req.body)
    req.body.logo = req.file.fileName

    brand.slug =slugify(brand.name)
    console.log(brand);
    await brand.save()
    console.log(brand);
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
    if(req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.fileName
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