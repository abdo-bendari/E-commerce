import User from "../../../../database/models/User.js";
import catchError from "../../../middleware/catchError.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import AppError from "../../../utils/Error.js";
import dotenv from "dotenv"
dotenv.config()

export const signUp = catchError(async(req,res,next)=>{
    let user = new User (req.body)
    await user.save()
    const token =jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    res.status(200).json({message:"done",token,status:200})
})

export const signIn = catchError(async(req,res,next)=>{
    const {email,password}=req.body
    const user = await User.findOne({email : email})
    if(user && bcrypt.compareSync(password,user.password)){
    const token =jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    return  res.status(200).json({message:"done",token,status:200})
    }
    return next(new AppError('invalid email or password'),400)
})

export const changeUserPassword = catchError(async(req,res,next)=>{
    const {oldPassword,newPassword}=req.body
    const user = await User.findOne({email:req.body.email})
    if(user && bcrypt.compareSync(oldPassword,user.password)){
    await User.findOneAndUpdate({email:req.body.email},{ password :newPassword ,passwordChangedAt : Date.now()})
    const token =jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    return res.status(200).json({message:"done",token})
    }
    return  next(new AppError('invalid email or password'),400);
})


export const protectedRoutes = catchError(async(req,res,next)=>{  // authentication
    let {token} = req.headers
    let userPayload = null
    if(!token) return next(new AppError('token not provided'))
    jwt.verify(token,"E-commerce",(err,payload)=>{
   if (err) return next(new AppError(err,401))
     userPayload = payload
    })
    let user = await User.findById(userPayload.userId)
    if(!user) return next(new AppError('user not found',400))
        if(user.passwordChangedAt){
            let time = parseInt(user.passwordChangedAt.getTime() / 1000)
            if(time > userPayload.iat) return next (new AppError('invalid token ... login again'))
        }
        req.user=user
    next()
})

export const  allowedTo =(...roles)=>{       // authorization
    return catchError(async(req,res,next)=>{
   if(roles.includes(req.user.role)) return next()
    return next(new AppError('you are not authorized to access this endpoint',401))
    })
};