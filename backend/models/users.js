const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
});
//JWT Token
userSchema.methods.getJWTToken =async  function(){
    return await jwt.sign({ id: this._id , role: this.role}, process.env.JWT_SECRET_KEY , {
        expiresIn: process.env.JWT_EXPIRATION_IN_DAY,
    });
}

userSchema.methods.isPasswordMatch = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}



const User = mongoose.model('User' , userSchema);
module.exports = User;

