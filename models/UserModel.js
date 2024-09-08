const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter userName"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"]
    }
})
const User = mongoose.model("User", UserSchema)
module.exports = User