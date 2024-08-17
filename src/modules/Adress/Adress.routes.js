import { Router } from "express"
import { AddToAdress, getAllAdressFromUser, RemoveAdress } from "./Adress.controller.js"
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js"



const routerAdress = Router()


routerAdress.route('/')
.patch(ProtectAllRoutes,authForAdminOrUser('User'),AddToAdress)
.get(ProtectAllRoutes,authForAdminOrUser('User'),getAllAdressFromUser)
routerAdress.route('/:id')
.delete(ProtectAllRoutes,authForAdminOrUser('User','Admin'),RemoveAdress)





export default routerAdress
 