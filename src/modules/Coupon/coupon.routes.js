import { Router } from "express";
import * as all from "./controller/coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/controller/auth.controller.js";

const couponRouter = Router()
couponRouter.use(protectedRoutes,allowedTo('admin'))

couponRouter.post('/',all.addCoupon)
.get('/',all.allCoupons)
.get('/:id',all.getCoupon)
.put('/:id',all.updateCoupon)
.delete('/:id',all.deleteCoupon)
export default couponRouter