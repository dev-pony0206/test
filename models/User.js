const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: true
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
