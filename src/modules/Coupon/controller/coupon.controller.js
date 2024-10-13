import AppError from "../../../utils/Error.js"
import catchError from "../../../middleware/catchError.js"
import Coupon from "../../../../database/models/Coupon.js"

export const addCoupon = catchError(async(req,res,next)=>{
    const exist = await Coupon.findOne({code : req.body.code})
    if(exist){
        next(new AppError('coupon already exist',400))
    }
    const coupon = await Coupon.insertMany(req.body)
    return res.status(201).json({message :'done',coupon})
})

export const allCoupons = catchError(async(req,res,next)=>{
    const coupons = await Coupon.find()
    return coupons.length == 0 ?
    next(new AppError('not found coupons',404)) :
    res.status(201).json({message :'done',coupons})
})

export const getCoupon = catchError(async(req,res,next)=>{
    const {id} =req.params
    const coupon = await Coupon.findById(id)
    return !coupon?
    next(new AppError('not found coupon',404)) :
    res.status(201).json({message :'done',coupon})
})

export const updateCoupon =catchError(async(req,res,next)=>{
    const coupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!coupon) {
        return next(new AppError('coupon not found', 404));
    }
    res.status(201).json({ message: 'done', coupon });
})

export const deleteCoupon =catchError(async(req,res,next)=>{
    const coupon = await Coupon.findByIdAndDelete(req.params.id)
    return !coupon?
    next(new AppError('not found coupon',404)) :
    res.status(201).json({message :'done',coupon})
})