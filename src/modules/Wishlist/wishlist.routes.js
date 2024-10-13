import { Router } from "express";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./controller/wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/controller/auth.controller.js";
const wishlistRouter = Router()

wishlistRouter.patch('/',protectedRoutes,allowedTo('user'),addToWishlist)
.get('/',protectedRoutes,allowedTo('user'),getLoggedUserWishlist)
.delete('/:id',protectedRoutes,allowedTo('user','admin'),removeFromWishlist)

export default wishlistRouter