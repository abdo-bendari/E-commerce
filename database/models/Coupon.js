import mongoose from "mongoose";
import { Schema } from "mongoose";

const couponSchema = new Schema({
    code :{
        type : String,
        required : true,
        unique : true
    },
    expires :{
        type : Date ,
        required : true
    },
    discount :{
        type : Number ,
    },
},{
    timestamps:true,
    versionKey:false
})

const Coupon = mongoose.model('Coupon',couponSchema)
export default Coupon