import AppError from "../../../utils/Error.js"
import catchError from "../../../middleware/catchError.js"
import User from "../../../../database/models/User.js"



export const addToWishlist = catchError(async(req,res,next)=>{
    let wishlist = await User.findByIdAndUpdate(req.user._id,{$addToSet : {wishlist : req.body.product}},{new : true})
    return !wishlist?
    next(new AppError('not found wishlist',404)) :
    res.status(201).json({message :'done',wishlist:wishlist.wishlist})
})


export const removeFromWishlist = catchError(async(req,res,next)=>{
    let wishlist = await User.findByIdAndUpdate(req.user._id,{$pull : {wishlist : req.params.id}},{new : true})
    return !wishlist?
    next(new AppError('not found wishlist',404)) :
    res.status(201).json({message :'done',wishlist:wishlist.wishlist})
})

export const getLoggedUserWishlist = catchError(async(req,res,next)=>{
    let wishlist = await User.findById(req.user._id).populate('wishlist')
    return !wishlist?
    next(new AppError('not found wishlist',404)) :
    res.status(201).json({message :'done',wishlist:wishlist.wishlist})
})