const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model('User', userSchema);