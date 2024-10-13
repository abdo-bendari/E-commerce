import catchError from "./src/middleware/catchError.js"
import Stripe from "stripe";
import Cart from "./database/models/Cart.js"
import Order from "./database/models/Order.js"
import User from "./database/models/User.js"
import Product from "./database/models/product.js"
const stripe = new Stripe(
  "sk_test_51Q8k4oADDE4xwbMLuk629gfxCdDQUm45jsTiIFtMtGQlUvUK7kQe9fPwC8GbJh4gSy6c9Bk2P3BAOA7OYgEafJ9O00JKikJHjm"
);


app.post('/api/webhook', express.raw({type: 'application/json'}),catchError( async(req, res) => {
    const signature = req.headers['stripe-signature'].toString()
    let  event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        "whsec_RpAOysJNoZEUv3A4ptTODDEoDvZLDDUF"
      );
      let checkout
    if(event.type == "checkout.session.completed"){
       checkout =event.data.object
    }
    let user = await User.findOne({email : checkout.customer_email})
    let cart = await Cart.findById(checkout.client_reference_id);

let order = new Order({
  user: user._id,
  orderItems: cart.cartItems,
  address: checkout.address,
  totalOrderPrice: checkout.amount_total / 100,
  paymentType : "card",
  isPaid : true
});
await order.save();

let options = cart.cartItems.map((prod) => {
  return {
    updateOne: {
      filter: { _id: prod.product },
      update: { $inc: { sold: prod.quantity, stock: -prod.quantity } },
    },
  };
});
await Product.bulkWrite(options);
await Cart.findByIdAndDelete(cart._id)
  res.json({message :"done",checkout})
}));