import { Router } from "express"
import { 
    addSubCategory,
    deleteSubCategory,
    getAllSubCategory,
    getSubCategory,
    updateSubCategory 
    } from "./subCategory.controller.js"
import { findCategoryId } from "../../middleware/subCategory/findIdCategory.js"
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js"


const routerSubCategory = Router({mergeParams:true})

routerSubCategory.route('/')
.post(ProtectAllRoutes,authForAdminOrUser('Admin'),addSubCategory)
.get(ProtectAllRoutes,authForAdminOrUser('User','Admin'),getAllSubCategory)
routerSubCategory.route('/:id')
.get(ProtectAllRoutes,authForAdminOrUser('User','Admin'),getSubCategory)
.put(ProtectAllRoutes,authForAdminOrUser('Admin'),findCategoryId,updateSubCategory)
.delete(ProtectAllRoutes,authForAdminOrUser('Admin'),deleteSubCategory)




export default routerSubCategory
 