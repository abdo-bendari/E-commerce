import { Router } from "express";
import * as all from "./controller/brand.controller.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
import validation from "../../middleware/validation.js";
import addBrandSchema from "./brand.validation.js";
import { protectedRoutes } from "../auth/controller/auth.controller.js";

const brandRouter = Router()

brandRouter.post('/',protectedRoutes,uploadSingleFile('logo','brands'),validation(addBrandSchema),all.addBrand)
.get('/',all.allBrands)
.get('/:name',all.getBrand)
.put('/:id',protectedRoutes,uploadSingleFile('logo','brands'),all.updateBrand)
.delete('/:id',protectedRoutes,all.deleteBrand)
export default brandRouter