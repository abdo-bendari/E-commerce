import mongoose from "mongoose";
import { Schema } from "mongoose";

const brandSchema = new Schema(
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
      trim: true,
    },
    logo: String,
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

brandSchema.post("init", function (doc) {
  if (doc.logo) {
    doc.logo = process.env.BASE_URL+"brands/" + doc.logo;
  }
});

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
