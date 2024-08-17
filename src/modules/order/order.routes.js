import { Router } from "express";
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createToCheckOut, getAllOrdersOfUser, getAllOrdersOfUserMergParams, getAllOrdersUsersByAdmin, getCreateSessionForPay } from "./order.controller.js";


const routerOrder = Router({mergeParams:true}) 
routerOrder.route('/:id')
.post(ProtectAllRoutes,authForAdminOrUser('User','Admin'),createCashOrder)
routerOrder.get('/Adminstrator',ProtectAllRoutes,authForAdminOrUser('Admin'),getAllOrdersUsersByAdmin)
routerOrder.get('/orders',ProtectAllRoutes,authForAdminOrUser('User','Admin'),getAllOrdersOfUser) 
routerOrder.get('/checkOut',getCreateSessionForPay) 



routerOrder.post('/checkOut/:cartId',ProtectAllRoutes,authForAdminOrUser('User','Admin'),createToCheckOut) 







routerOrder.route('/')
.get(getAllOrdersOfUserMergParams)












export default routerOrder