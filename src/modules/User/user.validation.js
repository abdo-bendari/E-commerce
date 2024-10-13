import joi from 'joi'
const addUserSchema = joi.object({
  name: joi.string().min(2).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string()
  .length(8)
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/) 
  .required(),
  role: joi.string().valid('user', 'admin').default('user'),
  address: joi.array().items(
      joi.object({
          city: joi.string().optional(),
          street: joi.string().optional(),
          phone: joi.string().optional(),
      })
  ).optional(),
});
export default addUserSchema
