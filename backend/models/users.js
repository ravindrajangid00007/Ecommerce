const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"Please enter your name"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email : {
        type: String,
        required: [true,"Please enter your email address"],
        unique: true,
        validate: [validator.isEmail, "please enter valid email address"]
    },
    password : {
        type: String,
        required: [true,"Please enter your password"],
        minLength: [8 , "Password must be at least 8 characters"],
        select: false,
    },
    avatar : {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},{
    timestamps: true,
});
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})
const User = mongoose.model('User' , userSchema);
module.exports = User;
