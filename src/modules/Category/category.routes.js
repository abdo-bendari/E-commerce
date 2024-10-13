import { Router } from "express";
import * as all from "./controller/category.controller.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
import addCategorySchema from "./category.validation.js";
import validation from "../../middleware/validation.js";
import SubCategoryRouter from "../SubCategory/SubCategory.routes.js";
import { protectedRoutes } from "../auth/controller/auth.controller.js";
const categoryRouter = Router()

categoryRouter.use('/:category/subCategories',SubCategoryRouter) // mergParams

categoryRouter.post('/',protectedRoutes,uploadSingleFile('image','categories'),validation(addCategorySchema),all.addCategory)
.get('/',all.allCategories)
.get('/:name',all.getCategory)
.put('/:id',protectedRoutes,uploadSingleFile('image','categories'),all.updateCategory)
.delete('/:id',protectedRoutes,all.deleteCategory)
export default categoryRouter