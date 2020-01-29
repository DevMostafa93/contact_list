const mongoose = require('mongoose');
const ObjectID = require('bson').ObjectID;

const { Schema } = mongoose;


const contactSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,

    },
    mobile: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectID,
        required: true,
        ref: 'Users'
    },
    createdAt: {
        type: Date
    }
});

contactSchema.methods.toJSON = function () {
    let contact = this.toObject();
    contact.contactId = contact._id;
    contact.mobileNumber = contact.mobile;
    delete contact._id;
    delete contact.mobile;
    delete contact.__v;

    return contact;
}

contactSchema.methods.getPublicFields = function () {
    var returnObject = {
        contactId: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        mobileNumber: this.mobile,
        userId: this.userId,
    };
    return returnObject;
};

const ContactModel = mongoose.model('Contacts', contactSchema);



exports.ContactModel = ContactModel;

