import catchError from "../../../middleware/catchError.js";
import Product from "../../../../database/models/product.js";
import slugify from "slugify";
import AppError from "../../../utils/Error.js";
import ApiFeatures from "../../../utils/apiFeatures.js";

export const addProduct = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(img => img.filename)
    const product = await Product.insertMany(req.body)
    return res.status(201).json({message :'done',product})    
})

export const allProducts = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Product.find() , req.query)
    .pagination().fields().filter().sort().search()
    const products = await apiFeatures.mongooseQuery
    return products.length == 0 ?
    next(new AppError('not found products',404)) :
    res.status(201).json({message :'done',page : apiFeatures.pageNumber,products})
})

export const getProduct = catchError(async(req,res,next)=>{
    const {id} =req.params
    const product = await Product.findById(id)
    return !product?
    next(new AppError('not found product',404)) :
    res.status(201).json({message :'done',product})
})

export const updateProduct =catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!product) {
        return next(new AppError('product not found', 404));
    }
    res.status(201).json({ message: 'done', product });
})

export const deleteProduct =catchError(async(req,res,next)=>{
    const product = await Product.findByIdAndDelete(req.params.id)
    return !product?
    next(new AppError('not found product',404)) :
    res.status(201).json({message :'done',product})
})