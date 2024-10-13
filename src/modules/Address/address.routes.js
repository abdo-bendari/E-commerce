import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/controller/auth.controller.js";
import { addAddress, getAddresses, removeAddress } from "./controller/address.controller.js";

const addressRouter = Router()

addressRouter.patch('/',protectedRoutes,allowedTo('user'),addAddress)
.get('/',protectedRoutes,allowedTo('user'),getAddresses)
.delete('/:id',protectedRoutes,allowedTo('user','admin'),removeAddress)

export default addressRouter