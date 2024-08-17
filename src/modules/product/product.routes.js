import { Router } from "express"
import { uploadArrayOfFile } from "../../middleware/fileUploads/fileUpload.js"
import { Validate } from "../../middleware/Validate.js"
import {
    AddProduct,
    DeleteProducts,
    GetAllProducts,
    getProduct,
    UpdateProducts
} from "./product.controller.js"
import { ProductValidation } from "./product.validation.js"



const routerProduct = Router()

// routerProduct.route('/')
// .post(ProtectAllRoutes,authForAdminOrUser('Admin'),uploadArrayOfFile('products',[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]),Validate(ProductValidation),AddProduct)
// .get(ProtectAllRoutes,authForAdminOrUser('User','Admin'),GetAllProducts)

// routerProduct.route('/:id')
// .get(ProtectAllRoutes,authForAdminOrUser('User','Admin'),getProduct)
// .put(ProtectAllRoutes,authForAdminOrUser('User','Admin'),uploadArrayOfFile('products',[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]),UpdateProducts)
// .delete(ProtectAllRoutes,authForAdminOrUser('User','Admin'),DeleteProducts)

routerProduct.route('/')
.post(uploadArrayOfFile('products',[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]),Validate(ProductValidation),AddProduct)
.get(GetAllProducts)

routerProduct.route('/:id')
.get(getProduct)
.put(uploadArrayOfFile('products',[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]),UpdateProducts)
.delete(DeleteProducts)




export default routerProduct
 