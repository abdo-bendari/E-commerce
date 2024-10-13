import SubCategory from "../../../../database/models/subCategory.js";
import catchError from "../../../middleware/catchError.js";
import ApiFeatures from "../../../utils/apiFeatures.js";
import AppError from "../../../utils/Error.js";
import slugify from "slugify";

export const addSubCategory = catchError(async(req,res,next)=>{
    const {name} = req.body
     req.body.slug = slugify(name)
    const subCategory = await SubCategory.insertMany(req.body)
    return res.status(201).json({message :'done',subCategory})
})

export const allSubCategories = catchError(async(req,res,next)=>{
    let filterObj = {}
    if(req.params.category) filterObj.category = req.params.category
    
    let apiFeatures = new ApiFeatures(SubCategory.find(filterObj), req.query)
    .pagination().fields().filter().sort().search()
    const subCategories = await apiFeatures.mongooseQuery
    return subCategories.length == 0 ?
    next(new AppError('not found subCategories',404)) :
    res.status(201).json({message :'done',page : apiFeatures.pageNumber,subCategories})
})

export const getSubCategory = catchError(async(req,res,next)=>{
    const {name} =req.params
    const subCategory = await SubCategory.findOne({name : name})
    return !subCategory?
    next(new AppError('not found subCategory',404)) :
    res.status(201).json({message :'done',subCategory})
})

export const updateSubCategory =catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    const subCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!subCategory) {
        return next(new AppError('subCategory not found', 404));
    }
    res.status(201).json({ message: 'done', subCategory });
})

export const deleteSubCategory =catchError(async(req,res,next)=>{
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id)
    return !subCategory?
    next(new AppError('not found subCategory',404)) :
    res.status(201).json({message :'done',subCategory})
})