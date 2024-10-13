import { Router } from "express"
import * as all from "./controller/review.controller.js"
import { allowedTo, protectedRoutes } from "../auth/controller/auth.controller.js"
const reviewRouter = Router()

reviewRouter.post('/',protectedRoutes,allowedTo('user'),all.addReview)
.get('/',all.allReviews)
.get('/:id',all.getReview)
.put('/:id',protectedRoutes,allowedTo("user"),all.updateReview)
.delete('/:id',protectedRoutes,allowedTo("admin",'user'),all.deleteReview)
export default reviewRouter