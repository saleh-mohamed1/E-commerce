import { Router } from "express"

import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js"
import {
    AddReview, DeleteReview, GetAllReviews,
    getReview,
    UpdateReview
} from "./review.controller.js"


const routerReview = Router()

routerReview.route('/')
.post(ProtectAllRoutes,authForAdminOrUser('User'),AddReview)
.get(GetAllReviews)

routerReview.route('/:id')
.get(getReview)
.put(ProtectAllRoutes,authForAdminOrUser('User'),UpdateReview)
.delete(ProtectAllRoutes,authForAdminOrUser('User','Admin'),DeleteReview)




export default routerReview
 