
import express from "express";
import { Router } from "express";
import * as all from "./controller/user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import validation from "../../middleware/validation.js";
import addUserSchema from "./user.validation.js";
 
const userRouter= Router()

userRouter.post('/',checkEmail,validation(addUserSchema),all.addUser)
.get('/',all.allUsers)
.get('/:name',all.getUser)
.put('/:id',all.updateUser)
.delete('/:id',all.deleteUser)

export default userRouter