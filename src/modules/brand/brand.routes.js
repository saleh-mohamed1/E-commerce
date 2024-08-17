import { Router } from "express"

import {
    AddBrand,
    DelteBrand,
    GetAllBrands,
    getBrand,
    UpdateBrand
} from "./brand.controller.js"
import { uploadSingleFile } from "../../middleware/fileUploads/fileUpload.js"
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js"


const routerBrand = Router()

routerBrand.route('/')
.post(ProtectAllRoutes,authForAdminOrUser('Admin'),uploadSingleFile('brand','logo'),AddBrand)
.get(ProtectAllRoutes,authForAdminOrUser('User','Admin'),GetAllBrands)

routerBrand.route('/:id')
.get(ProtectAllRoutes,authForAdminOrUser('User','Admin'),getBrand)
.put(ProtectAllRoutes,authForAdminOrUser('Admin'),uploadSingleFile('brand','logo'),UpdateBrand)
.delete(ProtectAllRoutes,authForAdminOrUser('Admin'),DelteBrand)




export default routerBrand
 