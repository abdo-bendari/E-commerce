import AppError from "../../../utils/Error.js"
import catchError from "../../../middleware/catchError.js"
import User from "../../../../database/models/User.js"
import Cart from "../../../../database/models/Cart.js"
import Product from "../../../../database/models/product.js"
import Coupon from "../../../../database/models/Coupon.js"

/**
 * Calculates the total price of the cart, including discounts.
 * 
 * This function takes the cart object and calculates the total price
 * based on the quantities and prices of the items in the cart. If a 
 * discount is applied, it will calculate the total price after 
 * the discount as well.
 * @param {Object} isCartExist - The cart object containing items and discounts.
 * @property {Array} isCartExist.cartItems - An array of cart items.
 * @property {number} isCartExist.discount - The discount percentage.
 */
function calcTotalPrice(isCartExist){
    isCartExist.totalCartPrice = isCartExist.cartItems.reduce((prev,ele)=> prev += ele.quantity * ele.price,0)
    if(isCartExist.discount){
        isCartExist.totalPriceAfterDiscount = isCartExist.totalCartPrice - (isCartExist.totalCartPrice * isCartExist.discount)/100
    }
}
/**
 * Adds a product to the user's cart.
 * 
 * This function performs the following steps:
 * 1. Checks if a cart already exists for the user.
 * 2. If the cart does not exist, it creates a new cart with the 
 *    provided product.
 * 3. If the cart exists, it checks if the product is already in 
 *    the cart:
 *    - If the product is found, it updates the quantity and price.
 *    - If the product is not found, it adds the new product to 
 *    the cart.
 * 4. Calculates the total price of the cart including any 
 *    applicable discounts.
 *  @param {Object} req - The request object containing:
 *  @param {string} req.body.product - The ID of the product to add to the cart.
 *  @param {number} [req.body.quantity=1] - The quantity of the product to add. 
 *       Defaults to 1 if not specified.
 *  * @throws Will throw an AppError if the following conditions are met:
 *   - The specified product is not found in the cart (404).
 *  @param {Object} req.user - The user object containing the user's ID.
 *  @param {Function} next - The next middleware function for error handling.
 */
export const addToCart = catchError(async(req,res,next)=>{
    let isCartExist = await Cart.findOne({user : req.user._id})
    let cartProduct = await Product.findById(req.body.product)
    if(!cartProduct) return next(new AppError('Product not found',404))

    if(req.body.quantity > cartProduct.stock) return next(new AppError('Sold Out',404))

    if(!isCartExist){
      // Create a new cart if it doesn't exist
        let cart = new Cart({
            user : req.user._id,
            cartItems : [req.body],
        })
        calcTotalPrice(cart)
        await cart.save()
        res.status(201).json({message :'done',cart})
    }else{
      // Update the existing cart    
     let item = isCartExist.cartItems.find(item => item.product == req.body.product)
     if(item) {
        item.price = cartProduct.price
        item.quantity += req.body.quantity || 1
        if(item.quantity >= cartProduct.stock) return next(new AppError('Sold Out',404))
     }     
     // Add the new item to the cart
     if(!item) isCartExist.cartItems.push(req.body)
        isCartExist.cartItems.price = cartProduct.price
     // Recalculate the total price of the cart
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.status(201).json({message :'done',cart : isCartExist})
    }
})

/**
 * Updates the quantity of a specific product in the user's cart.
 * 
 * This function performs the following steps:
 * 1. Retrieves the cart for the logged-in user.
 * 2. Checks if the specified product exists in the cart:
 *    - If the product is found, it updates the quantity with the value 
 *      provided in the request body.
 *    - If the product is not found, it throws an error indicating that 
 *      the product is not in the cart.
 * 3. Calculates the total price of the cart after the quantity update.
 * @param {number} req.body.quantity - The new quantity of the product.
 * @param {string} req.params.id - The ID of the product to update.
 * @param {Object} req.user - The user object containing the user's ID.
 * @returns {Object} res.status(201).json({ message: 'done', cart }); - 
 *   Returns the updated cart after successfully updating the product quantity.
 */

export const updateQuantity = catchError(async(req,res,next)=>{
    // Retrieve the cart for the logged-in user
    let cart = await Cart.findOne({user : req.user._id})
    // Find the specific item in the cart
    let item = cart.cartItems.find(item => item.product == req.params.id)
    if(!item) return next(new AppError('not found product',404))
    // Update the item's quantity with the new value    
    item.quantity = req.body.quantity
    // Recalculate the total price of the cart after the update
    calcTotalPrice(cart)
   await cart.save()
    res.status(201).json({message :'done',cart})
})

export const removeItem = catchError(async(req,res,next)=>{
    let cart = await Cart.findOneAndUpdate({user : req.user._id },{$pull : {cartItems :{ _id:req.params.id}}},{new : true})
    calcTotalPrice(cart)
    await cart.save()
    return !cart?
    next(new AppError('not found cart',404)) :
    res.status(201).json({message :'done',cart})
})

export const getLoggedUserCart= catchError(async(req,res,next)=>{
    let cart = await Cart.findOne({user : req.user._id})
    return !cart?
    next(new AppError('not found cart',404)) :
    res.status(201).json({message :'done',cart})
})

export const clearUserCart= catchError(async(req,res,next)=>{
    let cart = await Cart.findOneAndDelete({user : req.user._id})
    return !cart?
    next(new AppError('not found cart',404)) :
    res.status(201).json({message :'done',cart})
})

/**
 * Applies a coupon to the user's cart.
 * 
 * This function performs the following steps:
 * 1. Checks if the coupon code provided in the request body is valid 
 *    and has not expired.
 * 2. If the coupon is valid, retrieves the cart for the logged-in user.
 * 3. Applies the discount from the coupon to the cart.
 * 4. Saves the updated cart with the new discount applied.
 */

export const applyCoupon = catchError(async(req,res,next)=>{
    // Check if the coupon exists and is valid
    let coupon = await Coupon.findOne({code : req.body.code , expires : {$gte : Date.now()}})
    if(!coupon) return next(new AppError('Oops, coupon invalid',404))
    // Retrieve the user's cart
    let cart = await Cart.findOne({user : req.user._id})
    if(!cart) return  next(new AppError('not found cart',404)) 
     // Apply the discount to the cart   
    cart.discount = coupon.discount
    await cart.save()
    res.status(201).json({message :'done',cart})
})