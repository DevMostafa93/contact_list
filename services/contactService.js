const Joi = require("@hapi/joi");
const JoiErrorHandler = require('../utils/JoiErrorHandler');
const MainErrorHandler = require('../utils/MainErrorHandler');
const pagingHelper = require('../utils/pagingHelper');
const { ContactModel } = require('../models/contact_model')


//////////////////////// add new contact functions //////////////////////////////////////

exports.validateCreateContact = async (body) => {

    const validateContactSchema = Joi.object().keys({
        firstName: Joi.string().alphanum().required().min(3).max(25),
        lastName: Joi.string().alphanum().required().min(3).max(25),
        email: Joi.string().email().required(),
        mobile: Joi.string().required().pattern(/(2?01)[0-9]{9}/, { name: 'egypt mobile' })
    }).unknown();

    const { value, error } = validateContactSchema.validate(body, { abortEarly: false });
    if (error) {
        throw new JoiErrorHandler(400, error)
    }

    // if (await ContactModel.countDocuments({ email: body.email,mobile: body.mobile }) > 0)
    //     throw new MainErrorHandler(400, { message: "email and phone already exist in contacts" })

    return undefined;

}

exports.createContact = async (body, userId) => {
    const { firstName, lastName, email, mobile } = body;
    const contact = new ContactModel({ firstName, lastName, email, mobile })
    contact.userId = userId;
    contact.createdAt = new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / -60);


    let newContact = await contact.save()
    return newContact.getPublicFields();
}

////////////////////////// get user contacts paging functions //////////////////////////////////////

exports.validateGetList = async (body) => {

    const validateContactSchema = Joi.object().keys({
        pageNumber: Joi.number().integer().required()
    }).unknown();

    const { value, error } = validateContactSchema.validate(body, { abortEarly: false });
    if (error) {
        throw new JoiErrorHandler(400, error)
    }

    return undefined;

}

exports.getList = async (pageNumber, userId) => {

    let skip = 5 * (pageNumber - 1);
    let contacts = await ContactModel.find(
        { userId }
    ).populate('userId', 'name').skip(skip).limit(5).sort({ createdAt: 'descending' });

    let count = await ContactModel.countDocuments({ userId });
    return pagingHelper.initializeResponse(contacts, count, 5);
}

////////////////////////// get user recent 5 contacts functions //////////////////////////////////////

exports.getRecentList = async (userId) => {

    return await ContactModel.find(
        { userId }
    ).populate('userId', 'name').limit(5).sort({ createdAt: 'descending' });

}


