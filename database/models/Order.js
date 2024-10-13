import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";


const orderSchema = new Schema(
    {
        user :{
            type : Types.ObjectId,
            ref : 'User',
            required : true,
        },
        orderItems :[{
            product :{
                type : Types.ObjectId,
                ref : 'Product',
                required : true,
            },
            quantity :{
                type : Number ,
                default : 1
            },
            price :{
                type : Number ,
                min : 0
            }
        }],
        totalOrderPrice : {
            type : Number ,
            default : 0
        },
        isPaid : {
            type : Boolean,
            default : false
        },
        isDelivered : {
            type : Boolean,
            default : false
        },
        paidAt : Date ,
        deliveredAt : Date ,
        paymentType : {
            type : String ,
            enum : ['card','cash'],
            default : 'cash'
        },
        address :{
        city: String,
        street: String,
        phone: String
        },
        phone : String

},{
    timestamps : true ,
    versionKey : false
})

const Order = mongoose.model('Order',orderSchema)
export default Order;