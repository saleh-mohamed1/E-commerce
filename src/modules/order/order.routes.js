import { Router } from "express";
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createToCheckOut, getAllOrdersOfUser, getAllOrdersOfUserMergParams, getAllOrdersUsersByAdmin, getCreateSessionForPay } from "./order.controller.js";


const routerOrder = Router({mergeParams:true}) 
routerOrder.route('/:id')
// !to create Order do this
.post(ProtectAllRoutes,authForAdminOrUser('User','Admin'),createCashOrder)

// !to Get Order do this but you must be Admin
routerOrder.get('/Adminstrator',ProtectAllRoutes,authForAdminOrUser('Admin'),getAllOrdersUsersByAdmin)
// !to Get Order do this User Or Admin
routerOrder.get('/orders',ProtectAllRoutes,authForAdminOrUser('User','Admin'),getAllOrdersOfUser) 

routerOrder.get('/checkOut',getCreateSessionForPay) 



routerOrder.post('/checkOut/:cartId',ProtectAllRoutes,authForAdminOrUser('User','Admin'),createToCheckOut) 







routerOrder.route('/')
.get(getAllOrdersOfUserMergParams)












export default routerOrder