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
.get(GetAllBrands)

routerBrand.route('/:id')
.get(getBrand)
.put(ProtectAllRoutes,authForAdminOrUser('Admin'),uploadSingleFile('brand','logo'),UpdateBrand)
.delete(ProtectAllRoutes,authForAdminOrUser('Admin'),DelteBrand)




export default routerBrand
 