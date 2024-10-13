import { Router } from "express";
import { changeUserPassword, signIn ,signUp} from "./controller/auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import validation from "../../middleware/validation.js";
import addUserSchema from "../User/user.validation.js";
const authRouter = Router()

authRouter.post('/signUp',checkEmail,validation(addUserSchema),signUp)
.post('/signIn',signIn)
.patch('/',changeUserPassword)


export default authRouter