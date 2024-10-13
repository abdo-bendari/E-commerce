import AppError from "../../../utils/Error.js"
import catchError from "../../../middleware/catchError.js"
import User from "../../../../database/models/User.js"


export const addAddress = catchError(async(req,res,next)=>{
    let address = await User.findByIdAndUpdate(req.user._id,{$push : {address : req.body}},{new : true})
    return !address?
    next(new AppError('not found address',404)) :
    res.status(201).json({message :'done',address:address.address})
})


export const removeAddress = catchError(async(req,res,next)=>{
    let address = await User.findByIdAndUpdate(req.user._id,{$pull : {address :{ _id:req.params.id}}},{new : true})
    return !address?
    next(new AppError('not found address',404)) :
    res.status(201).json({message :'done',address:address.address})
})

export const getAddresses= catchError(async(req,res,next)=>{
    let address = await User.findById(req.user._id)
    return !address?
    next(new AppError('not found address',404)) :
    res.status(201).json({message :'done',address:address.address})
})