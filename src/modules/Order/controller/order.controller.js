import AppError from "../../../utils/Error.js";
import catchError from "../../../middleware/catchError.js";
import Order from "../../../../database/models/Order.js";
import Cart from "../../../../database/models/Cart.js";
import Product from "../../../../database/models/product.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Q8k4oADDE4xwbMLuk629gfxCdDQUm45jsTiIFtMtGQlUvUK7kQe9fPwC8GbJh4gSy6c9Bk2P3BAOA7OYgEafJ9O00JKikJHjm"
);

/**
 * Creates a cash order for the user based on their cart.
 * 
 * This function performs the following steps:
 * 1. Retrieves the user's cart by the provided cart ID.
 * 2. If the cart is not found, it throws an error.
 * 3. Calculates the total order price based on the cart's total price after discount or the total cart price.
 * 4. Creates a new order with the user's ID, order items from the cart, provided address, and total order price.
 * 5. Increments the sold quantity and decrements the stock of the products in the cart.
 * 6. Deletes the cart after the order is successfully created.
 * 
 * @param {string} req.params.id - The ID of the cart.
 * @param {Object} req.user - The user object containing the user's ID from token.
 * @param {Object} req.body.address - The delivery address for the order.
 * @param {Function} next - The next middleware function for error handling.
 */
export const createCashOrder = catchError(async (req, res, next) => {
  // Retrieve the cart using the provided ID
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));
  let totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalCartPrice;
  // Create a new order with the user's details
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    address: req.body.address,
    totalOrderPrice,
  });
  await order.save();
 
  // Increment sold quantity and decrement stock for each product
  let options = cart.cartItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, stock: -prod.quantity } },
      },
    };
  });
  // Perform bulk update for products
  await Product.bulkWrite(options);
  // Delete the cart after creating the order
  await Cart.findByIdAndDelete(cart._id);
  res.status(201).json({ message: "done", order });
});

export const getUserOrders = catchError(async (req, res, next) => {
  let orders = await Order.findOne({ user: req.user._id }).populate(
    "orderItems.product"
  );
  return !orders
    ? next(new AppError("not found any orders", 404))
    : res.status(201).json({ message: "done", orders });
});

export const getAllOrders = catchError(async (req, res, next) => {
  let orders = await Order.findOne({});
  return !orders
    ? next(new AppError("not found any orders", 404))
    : res.status(201).json({ message: "done", orders });
});

/**
 * Creates a checkout session for processing payments through Stripe.
 * 
 * This function performs the following steps:
 * 1. Retrieves the user's cart by the provided cart ID.
 * 2. If the cart is not found, it throws an error.
 * 3. Calculates the total order price based on the cart's total price after discount or the total cart price.
 * 4. Creates a checkout session with Stripe, including:
 *    - Line items for the product with its price and quantity.
 *    - Success and cancel URLs for redirecting the user after payment.
 *    - The customer's email and a reference ID for the cart.
 * 5. Returns the session details to the client.
 * 
 *  @param {string} req.params.id - The ID of the cart from token.
 *  @param {Object} req.user - The user object containing the user's details such as name and email.
 *  @param {Function} next - The next middleware function for error handling.
 *  @returns {Object} res.status(201).json({ message: 'done', session }); - 
 *   Returns the created Stripe checkout session after successfully processing the request.
 */

export const createCheckoutSession = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("cart not found", 404));
  // Calculate the total order price
  let totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalCartPrice;
  const YOUR_DOMAIN = 'http://localhost:4242';
  // Create a checkout session with Stripe
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
       success_url: `${YOUR_DOMAIN}?success=true`, 
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,

    customer_email : req.user.email,
    client_reference_id : req.params.id,
    metadata : req.body.address
  });
   res.status(201).json({ message: "done", session });
});
