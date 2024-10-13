import Brand from "../../../../database/models/brand.js";
import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import slugify from "slugify";
import fs from 'fs'
import ApiFeatures from "../../../utils/apiFeatures.js";

export const addBrand = catchError(async(req,res,next)=>{
    const {name} = req.body
     req.body.slug = slugify(name)
     req.body.logo = req.file.filename
    const category = await Brand.insertMany(req.body)
    return res.status(201).json({message :'done',category})
})

export const allBrands = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Brand.find() , req.query)
    .pagination().fields().filter().sort().search()
    const brands = await apiFeatures.mongooseQuery
    return brands.length == 0 ?
    next(new AppError('not found brands',404)) :
    res.status(201).json({message :'done',page:apiFeatures.pageNumber,brands})
})

export const getBrand = catchError(async(req,res,next)=>{
    const {name} =req.params
    const brand = await Brand.findOne({name : name})
    return !brand?
    next(new AppError('not found brand',404)) :
    res.status(201).json({message :'done',brand})
})

export const updateBrand =catchError(async(req,res,next)=>{
    if(req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename

    const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!brand) {
        return next(new AppError('brand not found', 404));
    }
    res.status(201).json({ message: 'done', brand });
})

export const deleteBrand =catchError(async(req,res,next)=>{
    const brand = await Brand.findByIdAndDelete(req.params.id)
    return !brand?
    next(new AppError('not found brand',404)) :
    res.status(201).json({message :'done',brand})
})