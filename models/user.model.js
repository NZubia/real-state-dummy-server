const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});


const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
