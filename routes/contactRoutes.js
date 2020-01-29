const router = require('express').Router();
const contactController = require('../controllers/contactController');


router.post('/addContact', contactController.addNewContact);


router.post('/getList', contactController.getContactsList);


router.post('/getRecentList', contactController.getRecentContactsList);


module.exports = router;