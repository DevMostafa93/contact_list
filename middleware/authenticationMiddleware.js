
const { UserModel } = require('../models/users_model')
const JoiErrorHandler = require('../utils/JoiErrorHandler');
const MainErrorHandler = require('../utils/MainErrorHandler');
const Joi = require("@hapi/joi");

module.exports = async function (req, res, next) {

  try {
    
    const validateEventSchema = Joi.object().keys({
      authorization: Joi.string().required(),
      deviceToken: Joi.string().required(),
      fingerPrint: Joi.string().required()
    }).unknown();

    const { value, error } = validateEventSchema.validate(req.body, { abortEarly: false });
    if (error)
      throw new JoiErrorHandler(400, error)

    const user = await UserModel.findOne({ authorization: req.body.authorization, deviceToken: req.body.deviceToken, fingerPrint: req.body.fingerPrint })
    if (!user)
      throw new MainErrorHandler(401, { message: 'U are not authorized' })

    req.user = user;
    next();
  } catch (e) {
    return next(e)
  }
}