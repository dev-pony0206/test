const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {  
        type: String,
        required: true,
    },
    age: {
      type:Number,
      required: true
    },
    date_c: {
        type: Date,
        default: Date.now,
    },
    date_u: {
      type: Date,
      default: ""
    }
});

module.exports = User = mongoose.model('user', UserSchema); 
