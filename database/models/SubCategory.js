import mongoose from "mongoose";
import { Schema } from "mongoose";

const subcategorySchema = new Schema ({
name :{
     type : String,
required :[true,"name is required"],
trim :true ,
unique :[true,'name is unique'],
minLength :[2,'min length is 2 character'],
maxLength :[50,'max length is 50 character']
},
slug :{
    type : String,
    required :[true,"name is required"],
    lowerCase : true,
    trim: true
    },
createdBy:{
    type : Schema.Types.ObjectId ,
    // required :[true,"createdBy is required"],
    ref : 'User'
},
updatedBy:{
    type : Schema.Types.ObjectId ,
    ref : 'User'
},
category :{
    type : Schema.Types.ObjectId ,
    required :[true,"category is required"],
    ref : 'Category'
}
},{
    timestamps : true,
    versionKey:false
})

const SubCategory = mongoose.model('SubCategory',subcategorySchema)
export default SubCategory