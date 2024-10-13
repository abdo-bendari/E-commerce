import AppError from "../../../utils/Error.js";
import catchError from "../../../middleware/catchError.js";
import Review from "../../../../database/models/review.js";

export const addReview= catchError(async(req,res,next)=>{
    req.body.user = req.user._id
    let isExist = await Review.findOne({user : req.user._id , product : req.body.product})
    if(isExist) return next( new AppError('you created a review before',409))
    const review = await Review.insertMany(req.body)
    return res.status(201).json({message :'done',review})
})

export const allReviews = catchError(async(req,res,next)=>{
    const reviews = await Review.find()
    return reviews.length == 0 ?
    next(new AppError('not found reviews',404)) :
    res.status(201).json({message :'done',reviews})
})

export const getReview = catchError(async(req,res,next)=>{
    const {id} =req.params
    const review = await Review.findOne({_id : id})
    return !review?
    next(new AppError('not found review',404)) :
    res.status(201).json({message :'done',review})
})

export const updateReview =catchError(async(req,res,next)=>{
    const review = await Review.findOneAndUpdate({_id : req.params.id,user : req.user._id},req.body,{ new: true }  );
    return !review?
    next(new AppError('not found review or you are not created review',404)) :
    res.status(201).json({message :'done',review})
})

export const deleteReview =catchError(async(req,res,next)=>{
    const review = await Review.findOneAndDelete({_id : req.params.id,user : req.user._id})
    return !review?
    next(new AppError('not found review or you are not created review',404)) :
    res.status(201).json({message :'done',review})
})