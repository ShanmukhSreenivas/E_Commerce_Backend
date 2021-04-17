'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cart_schema = new Schema ({
    productId: {
        type: String,
        default: ' ',
        required: true,
    },
    productName: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Please check the entered quantity again");
        }
    },
    amount: {
        type: Number,
        validate(value) {
            if (value < 0) throw new Error("Please check the amount again");
        }
    }
}, 
{ 
    _id : false 
});

const user_cart_schema = new Schema ({
    userId: {
        type: String,
        required: true,
        index: { 
            unique: true 
        }
    },
    cart: [cart_schema]
});

module.exports = mongoose.model("model", user_cart_schema);
