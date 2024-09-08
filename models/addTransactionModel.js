const mongoose = require("mongoose")

const AddTransactionSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Please enter amount"],
    },
    category: {
        type: String,
        required: [true, "please enter category"]
    },
    description: {
        type: String,
        requiredd: false
    },
    date: {
        type: Date,
        required: [true, "please enter date "]
    },

},
    {
        timestamps: true
    });

const Transaction = mongoose.model("Transaction", AddTransactionSchema)
module.exports = Transaction;