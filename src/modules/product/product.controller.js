import slugify from "slugify";
import { Product } from "../../../database/model/products.model.js";
import { catchErorr } from "../../middleware/catchErorr.js";
import { AppErorr } from "../../middleware/AppErorr.js";
import { deleteOne } from "../../refactor/deleteOne.js";
import { ApiFeature } from "../../utils/apiFeatures.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    

const AddProduct = catchErorr(async(req,res)=>{
    req.body.slug = slugify(req.body.title)
    if (req.files && req.files.imageCover && req.files.imageCover[0] && req.files.images) {
        req.body.imageCover = req.files.imageCover[0].filename;
        req.body.images = req.files.images.map(img => img.filename);
    } else {
        return res.status(400).json({ message: "Image files are missing" });
    }
    req.body.tittle_1=null
    let product = new Product(req.body)
    await product.save()
    res.json({message:"Success For Add",product})
})
const GetAllProducts =catchErorr( async(req,res)=>{
    let apiFeature = new ApiFeature(Product.find(),req.query).pagination().selectField().search().sort().filter()
    let product = await apiFeature.mongoosequery 
    if (product.length == 0) {
        return res.json({message:"wrong For Search Or Sort Or Select Field",})
     }
     
    res.json({message:"Success For Get All Product" ,pageNumber : apiFeature.pageNumber  ,product})

})
const getProduct = catchErorr(async(req,res)=>{
    let product = await Product.findById(req.params.id)
    product || next(new AppErorr('ProductId Not Found'),404)
    !product ||res.json({message:"Success For Get Product",product})
})

const UpdateProducts =catchErorr( async(req,res,next)=>{
    
    
    
    
    
    let product = await Product.findById(req.params.id);
    
    if (!product) return next(new AppErorr('ProductId Not Found', 404));

    if (req.body.slug) req.body.slug = slugify(req.body.title);
    // console.log('nnnnnnnnnnnnnnnn',req.file);
    
    if (req.files) {
        // Remove the old image cover
        let OldImageCover = product.imageCover.split('/').pop()
        if (product.imageCover) {
            
            const oldImageCoverPath = path.join(__dirname, '../../../uploads/products/', OldImageCover);
            if (fs.existsSync(oldImageCoverPath)) {
                fs.unlinkSync(oldImageCoverPath);
            }
        }

        req.body.imageCover = req.files.imageCover[0].filename;
        console.log('req.body.imageCover', req.body.imageCover);
        
        
        
    }

    if (req.files && req.files.images) {
        // Remove the old images
        if (product.images && product.images.length > 0) {
            product.images.forEach(image => {
                const oldImagesPath =image.split('/').pop()
                const oldImagePath = path.join(__dirname, '../../../uploads/products/', oldImagesPath);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            });
        }
        req.body.images = req.files.images.map(img => img.filename);
        console.log('req.body.images',req.body.images);
        
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProduct) {
        return next(new AppErorr('ProductId Not Found', 404));
    }
    res.json({ message: "Success For Update Product", updatedProduct });
});





const DeleteProducts = deleteOne(Product,'Product')




export {
    AddProduct, DeleteProducts, GetAllProducts,
    getProduct,
    UpdateProducts
};
