import { Router } from "express";
import { allowedTo,protectedRoutes } from "../auth/controller/auth.controller.js";
import * as all from "./controller/cart.controller.js";

const cartRouter = Router()
cartRouter.use(protectedRoutes,allowedTo("user"))

cartRouter.post('/',all.addToCart)
.put('/:id',all.updateQuantity)
.delete('/:id',all.removeItem)
.get('/',all.getLoggedUserCart)
.post('/coupon',all.applyCoupon)
export default cartRouter