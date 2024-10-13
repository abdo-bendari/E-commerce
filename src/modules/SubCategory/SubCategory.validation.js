import joi from 'joi'
const addSubCategorySchema = joi.object({
    name: joi.string().min(2).max(50).trim().required(),
  })
  .required();
export default addSubCategorySchema;
