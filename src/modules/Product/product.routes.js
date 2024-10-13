import { Router } from "express";
import * as all from "./controller/product.controller.js";
import { uploadMixFiles } from "../../middleware/fileUpload.js";
import validation from "../../middleware/validation.js";
import addProductSchema from "./product.validation.js";
import { protectedRoutes } from "../auth/controller/auth.controller.js";
const productRouter = Router()

productRouter.post('/',protectedRoutes,uploadMixFiles([{name : "imageCover", maxCount : 1},{name : "images",maxCount : 10}],"products"),validation(addProductSchema),all.addProduct)
.get('/',all.allProducts)
.get('/:id',all.getProduct)
.put('/:id',protectedRoutes,uploadMixFiles([{name : "imageCover", maxCount : 1},{name : " images",maxCount : 10}]),all.updateProduct)
.delete('/:id',protectedRoutes,all.deleteProduct)
export default productRouter