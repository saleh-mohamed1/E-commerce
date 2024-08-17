import { Router } from "express";
import { changeUserPassword, signin, signup } from "./auth.controller.js";
import { checkEmailExist } from "../../middleware/User/checkEmail.js";








const routerAuth = Router()


routerAuth.post('/signup',checkEmailExist,signup)
routerAuth.post('/signin',signin)
routerAuth.patch('/change-User-Password',changeUserPassword)


export default routerAuth
