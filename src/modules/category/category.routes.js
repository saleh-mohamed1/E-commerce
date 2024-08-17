import { Router } from "express"
import { addCategory, delteCategory, getAllCategory, getCategory, updateCategory } from "./category.controller.js"
import { uploadSingleFile } from "../../middleware/fileUploads/fileUpload.js"
import routerSubCategory from "../subCategory/subCategory.routes.js"
import { Validate } from "../../middleware/Validate.js"
import { validateCategory } from "./category.validation.js"
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js"


const routerCategory = Router()

routerCategory.use('/:category/subcategories',routerSubCategory)

routerCategory.route('/')
.post(ProtectAllRoutes,authForAdminOrUser('Admin'),uploadSingleFile('category','image'),Validate(validateCategory),addCategory)
.get(ProtectAllRoutes,authForAdminOrUser('Admin','User'),getAllCategory)

routerCategory.route('/:id')
.get(ProtectAllRoutes,authForAdminOrUser('Admin','User'),getCategory)
.put(ProtectAllRoutes,authForAdminOrUser('Admin'),uploadSingleFile('category','image'),updateCategory)
.delete(ProtectAllRoutes,authForAdminOrUser('Admin'),delteCategory)




export default routerCategory
 