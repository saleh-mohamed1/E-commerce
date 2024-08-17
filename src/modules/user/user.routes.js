import { Router } from "express"
import {
    AddUser,
    deleteUser,
    GetAllUsers,
    getUser,
    UpdateUser
} from "./user.controller.js"
import { checkEmailExist } from "../../middleware/User/checkEmail.js"
import routerOrder from "../order/order.routes.js"
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js"


const routerUser = Router()
routerUser.use('/:idUserToOrder/orders',routerOrder)

routerUser.route('/')
.post(checkEmailExist,AddUser)
.get(GetAllUsers)

routerUser.route('/:id')
.get(getUser)
.put(UpdateUser)
.delete(deleteUser)




export default routerUser
 