import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name is unique"],
      minLength: [2, "min length is 2 character"],
      maxLength: [50, "max length is 50 character"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    passwordChangedAt: {
      type: Date,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      // enum : Object.values(roles),
      // default : roles.user
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    address: [
      {
        city: String,
        street: String,
        phone: String
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password,8);
});

userSchema.pre("findOneAndUpdate", function () {
  if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,8);
});

const User = mongoose.model("User", userSchema);
export default User
