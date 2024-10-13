import Category from "../../../../database/models/category.js";
import catchError from "../../../middleware/catchError.js";
import slugify from "slugify";
import AppError from "../../../utils/Error.js";
import fs from 'fs'
import ApiFeatures from "../../../utils/apiFeatures.js";

export const addCategory = catchError(async(req,res,next)=>{
     req.body.slug = slugify(req.body.name)
     req.body.image=req.file.filename
    const category = await Category.insertMany(req.body)
    return res.status(201).json({message :'done',category})
})

export const allCategories = catchError(async(req,res,next)=>{
  let apiFeatures = new ApiFeatures(Category.find(),req.query)
  .pagination().fields().filter().sort().search()
  let categories = await apiFeatures.mongooseQuery
    return categories.length == 0 ?
    next(new AppError('not found categories',404)) :
    res.status(201).json({message :'done',page : apiFeatures.pageNumber,categories})
})

export const getCategory = catchError(async(req,res,next)=>{
    const {name} =req.params
    const category = await Category.findOne({name : name})
    return !category?
    next(new AppError('not found category',404)) :
    res.status(201).json({message :'done',category})
})

export const updateCategory =catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    if(req.file) req.body.image = req.file.filename
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!category){
        return next(new AppError('not found category', 404));
    }
    const oldCategory = await Category.findById(req.params.id);
    if (req.file?.filename) {
        const oldImagePath = `uploads/categories/${oldCategory.image}`;
        fs.unlink(oldImagePath)
    }
    res.status(201).json({ message: 'done', category });
})

export const deleteCategory =catchError(async(req,res,next)=>{
    const category = await Category.findByIdAndDelete(req.params.id)
    return !category?
    next(new AppError('not found category',404)) :
    res.status(201).json({message :'done',category})
})