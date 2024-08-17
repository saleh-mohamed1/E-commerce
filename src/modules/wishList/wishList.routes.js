import { Router } from "express"
import { AddToWishList, getLoggedUserFromWishList, RemoveFromWishList } from "./wishList.controller.js"
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js"



const routerWishList = Router()



routerWishList.route('/')
.patch(ProtectAllRoutes,authForAdminOrUser('User'),AddToWishList)
.get(ProtectAllRoutes,authForAdminOrUser('User'),getLoggedUserFromWishList)
routerWishList.route('/:id')
.delete(ProtectAllRoutes,authForAdminOrUser('User','Admin'),RemoveFromWishList)




export default routerWishList
 