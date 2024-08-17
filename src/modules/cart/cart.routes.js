import { Router } from "express"
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js"
import { AddToCart, ApplyCoupon, ClearAllItemsOfUserFromCart, getUserCart, removeProductItemOfCart, updateQuantityOfProduct } from "./cart.controller.js"



const routerCart = Router()


routerCart.route('/')
.post(ProtectAllRoutes,authForAdminOrUser('User','Admin'),AddToCart)
.get(ProtectAllRoutes,authForAdminOrUser('User'),getUserCart)
.delete(ProtectAllRoutes,authForAdminOrUser('User'),ClearAllItemsOfUserFromCart)


routerCart.route('/:id')
.put(ProtectAllRoutes,authForAdminOrUser('User'),updateQuantityOfProduct)
.delete(ProtectAllRoutes,authForAdminOrUser('User'),removeProductItemOfCart)


routerCart.post('/ApplyCoupon',ProtectAllRoutes,authForAdminOrUser('User','Admin'),ApplyCoupon)


export default routerCart
 