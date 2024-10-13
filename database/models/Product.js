import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      unique: [true, "title is unique"],
      minLength: [2, "min length is 2 character"],
      maxLength: [50, "max length is 50 character"],
    },
    slug: {
      type: String,
      required: [true, "title is required"],
      lowerCase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [2, "min length is 2 character"],
      maxLength: [2000, "max length is 50 character"],
    },
    images: [String],
    imageCover: String,
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "min price is 0"],
    },
    priceAfterDiscount: {
      type: Number,
      min: [0, "min price is 0"],
    },
    stock: {
      type: Number,
      required: [true, "stock is required"],
      min: [0, "min stock is 0"],
    },
    sold: {
      type: Number,
      min: [0, "min sold is 0"],
      default: 0,
    },
    rateCount: Number,
    rateAvg: {
      type: Number,
      min: [0, "min rateAvg is 0"],
      max: 5,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      // required :[true,"category is required"],
      ref: "Category",
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      // required :[true,"subCategory is required"],
      ref: "SubCategory",
    },
    brand: {
      type: Schema.Types.ObjectId,
      // required :[true,"brand is required"],
      ref: "Brand",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
    //   required: [true, "createdBy is required"],
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON : {virtuals : true }, id : false
  }
);

productSchema.post('init',function(doc){
       if(doc.imageCover) doc.imageCover= process.env.BASE_URL+"products/" +doc.imageCover
       if(doc.images) doc.images =doc.images.map(img=>process.env.BASE_URL+"products/"+img)
    
})

productSchema.virtual('reviews',{
    ref : "Review",
    localField:"_id",
    foreignField:"product",
})

productSchema.pre('findOne',function(){
    this.populate('reviews')
})

const Product = mongoose.model("Product", productSchema);
export default Product