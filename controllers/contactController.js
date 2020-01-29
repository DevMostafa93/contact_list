const catchAsync = require('../utils/catchAsync');
const successResponse = require('../utils/sucsess_response')
const contactService = require('../services/contactService');


exports.addNewContact = catchAsync(async (req, res, next) => {

  await contactService.validateCreateContact(req.body);

  const contact = await contactService.createContact(req.body, req.user._id);

  successResponse(res, 201, "contact created successfully", contact);

});

exports.getContactsList = catchAsync(async (req, res, next) => {

  await contactService.validateGetList(req.body);

  const contacts = await contactService.getList(req.body.pageNumber, req.user._id);

  successResponse(res, 200, "get all user contacts", contacts);

});

exports.getRecentContactsList = catchAsync(async (req, res, next) => {

  const contacts = await contactService.getRecentList(req.user._id);

  successResponse(res, 200, "get user recent 5 contact", contacts);

});