import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const CartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    cartItems: [
      {
        product: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
          unique: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalCartPrice: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalPriceAfterDiscount: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
