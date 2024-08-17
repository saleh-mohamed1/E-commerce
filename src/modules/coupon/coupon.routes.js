import { Router } from "express";
import {    AddCoupon,
            GetAllCoupons,
            getCoupon,
            UpdateCoupon,
            DelteCoupon
} from "./coupon.controller.js";
import { checkCouponExist } from "../../middleware/coupon/checkCouponExist.js";
import { authForAdminOrUser, ProtectAllRoutes } from "../auth/auth.controller.js";
import { Validate } from "../../middleware/Validate.js";
import { CouponValidation } from "./coupon.validation.js";

const routerCoupon = Router()
routerCoupon.use(ProtectAllRoutes,authForAdminOrUser('Admin'))
routerCoupon.route('/')
.post(checkCouponExist,Validate(CouponValidation),AddCoupon)
.get(GetAllCoupons)
routerCoupon.route('/:id')
.get(getCoupon)
.put(UpdateCoupon)
.delete(DelteCoupon)
export default routerCoupon
