const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subscriberSchema =  new Schema({
    name:{
        type: String,
        required: true
    },
    subcribeToChannel:{
        type: String,
        required: true
    },
    subscribeDate:{
        type: Date,
        default: Date.now,
        required: true
    }
});

// Creating a model
module.exports = mongoose.model("SubscribersModel",subscriberSchema)


