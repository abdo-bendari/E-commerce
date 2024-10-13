import { Router } from "express";
import * as all from "./controller/SubCategory.controller.js";
import { allowedTo, protectedRoutes } from "../auth/controller/auth.controller.js";
const SubCategoryRouter = Router({mergeParams : true})

SubCategoryRouter.post('/',protectedRoutes,allowedTo(),all.addSubCategory)
.get('/',all.allSubCategories)
.get('/:name',all.getSubCategory)
.put('/:id',protectedRoutes,all.updateSubCategory)
.delete('/:id',protectedRoutes,all.deleteSubCategory)
export default SubCategoryRouter