const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
   {
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
       type: String,
       enum: ["admin", "user", "moderator"],
       default: "user",
    },
    loginAttempts:{
        type:Number,
        default:0
    },

    lockUntil:{
        type:Date
    },

    firstFailedAttempt:{
        type:Date
    }
},
    {timestamps:true, versionKey: false},
)

const User = mongoose.model("User", userSchema)

module.exports= User