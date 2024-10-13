import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

reviewSchema.pre(/^find/,function(){
this.populate('user','name')
})

const Review = mongoose.model("Review", reviewSchema);
export default Review;
