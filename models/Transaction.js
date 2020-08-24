const mongoose = require('mongoose');
const user = require("./User");

const TransactionSchema = new mongoose.Schema({
    text:{
        type: String,
        trim: true,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('Transaction', TransactionSchema);