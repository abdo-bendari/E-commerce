import joi from 'joi'
const addOrderSchema = joi.object({
    user: joi.string().length(24),  
    orderItems: joi.array().items(
        joi.object({
            product: joi.string().length(24).required(), 
            quantity: joi.number().integer().min(1).default(1), 
            price: joi.number().positive().optional() 
        })
    ),  
    totalOrderPrice: joi.number().positive().optional().default(0),  
    isPaid: joi.boolean().default(false),
    isDelivered: joi.boolean().default(false),  
    paidAt: joi.date().optional(),  
    deliveredAt: joi.date().optional(),
    paymentType: joi.string().valid('card', 'cash').default('cash'), 
    address: joi.object({
        city: joi.string().optional(),
        street: joi.string().optional(),
        phone: joi.string().optional()
    }).optional(),
    phone: joi.string().optional() 
});
export default addOrderSchema