import { Router } from "express";
import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrders } from "./controller/order.controller.js";
import { allowedTo, protectedRoutes } from "../auth/controller/auth.controller.js";
import validation from "../../middleware/validation.js";
import addOrderSchema from "./order.validation.js";
const orderRouter = Router()
 
orderRouter.post('/:id',protectedRoutes,allowedTo('user'),createCashOrder)
.get('/userOrders',protectedRoutes,allowedTo('user','admin'),getUserOrders)
.get('/all',protectedRoutes,allowedTo('admin'),getAllOrders)
.post('/checkout/:id',protectedRoutes,allowedTo('user'),createCheckoutSession)
export default orderRouter