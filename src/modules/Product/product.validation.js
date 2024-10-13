import joi from 'joi'
const addProductSchema = joi.object({
    title: joi.string().min(2).max(50).trim().required(),
    imageCover: joi.object({
      fieldname: joi.string().required(),
      originalname: joi.string().required(),
      encoding: joi.string().required(),
      mimetype: joi.string().valid('image/jpeg','image/png','image/jpg').required(),
      size: joi.number().max(5242880).required(),
      destination: joi.string().required(),
      filename: joi.string().required(),
      path: joi.string().required(),
    }).required(),
    images : joi.array().items(joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size: joi.number().max(5242880).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    })).required()
  })
export default addProductSchema
