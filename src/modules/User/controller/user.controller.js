import User from "../../../../database/models/User.js";
import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import ApiFeatures from "../../../utils/apiFeatures.js";


 export const addUser = catchError(async(req,res,next)=>{
    const user = new User(req.body)
    await user.save()
    res.status(201).json({message :'done',user})
})

export const allUsers = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(User.find() , req.query)
    .pagination().fields().filter().sort().search()
    const users = await apiFeatures.mongooseQuery
    return users.length == 0 ?
    next(new AppError('not found users',404)) :
    res.status(201).json({message :'done',page:apiFeatures.pageNumber,users})
})

export const getUser = catchError(async(req,res,next)=>{
    const user = await User.findOne({name : name})
    return !user?
    next(new AppError('not found user',404)) :
    res.status(201).json({message :'done',user})
})

export const updateUser =catchError(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!user) {
        return next(new AppError('user not found', 404));
    }
    res.status(201).json({ message: 'done', user });
})

export const deleteUser =catchError(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    return !user?
    next(new AppError('not found user',404)) :
    res.status(201).json({message :'done',user})
})