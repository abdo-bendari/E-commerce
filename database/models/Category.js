import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: [true, "name is unique"],
      minLength: [2, "min length is 2 character"],
      maxLength: [50, "max length is 50 character"],
    },
    slug: {
      type: String,
      required: [true, "name is required"],
      lowerCase: true,
    },
    image: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      //  required :[true,"createdBy is required"],
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
  }
);

categorySchema.post("init", function (doc) {
  if (doc.image) {
    doc.image = process.env.BASE_URL+"categories/"+ doc.image;
  }
});
const Category = mongoose.model("Category", categorySchema);
export default Category;
