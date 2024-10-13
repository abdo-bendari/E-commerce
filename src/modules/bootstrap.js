
import dbConnection from "../../database/dbConnection.js";
import categoryRouter from "./Category/category.routes.js";
import globalError from "../middleware/globalError.js";
import SubCategoryRouter from "./SubCategory/SubCategory.routes.js";
import brandRouter from "./Brand/brand.routes.js";
import productRouter from "./Product/product.routes.js";
import AppError from "../utils/Error.js";
import userRouter from "./User/user.routes.js";
import authRouter from "./auth/auth.routes.js";
import reviewRouter from "./Review/review.routes.js";
import wishlistRouter from "./Wishlist/wishlist.routes.js";
import addressRouter from "./Address/address.routes.js";
import couponRouter from "./Coupon/coupon.routes.js";
import cartRouter from "./Cart/cart.routes.js";
import orderRouter from "./Order/order.routes.js";
export const bootstrap = (app, express) => {
  process.on("uncaughtException", (err) => {
    console.log(err);
  });
  
  app.use(express.json());
  dbConnection
// dotenv.config()
  const baseUrl ='/api/v1'
  app.use('/uploads',express.static('uploads'))
  app.use(`${baseUrl}/categories`,categoryRouter)
  app.use(`${baseUrl}/subCategories`,SubCategoryRouter)
  app.use(`${baseUrl}/brands`,brandRouter)
  app.use(`${baseUrl}/products`,productRouter)
  app.use(`${baseUrl}/users`,userRouter)
  app.use(`${baseUrl}/auth`,authRouter)
  app.use(`${baseUrl}/reviews`,reviewRouter)
  app.use(`${baseUrl}/wishlist`,wishlistRouter)
  app.use(`${baseUrl}/address`,addressRouter)
  app.use(`${baseUrl}/coupons`,couponRouter)
  app.use(`${baseUrl}/carts`,cartRouter)
  app.use(`${baseUrl}/orders`,orderRouter)

  app.use("*", (req, res, next) => {
    next(new AppError("route not found", 400));
  });
  process.on("unhandledRejection", (err) => {
    console.log(err);
  });
  app.use(globalError);
};
