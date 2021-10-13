const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const User = require("../models/users");

//register a user with

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password ,confirmPassword } = req.body;

  if(password != confirmPassword) {
      return next(new ErrorHandler("Password and confirmPassword do not match" , 400));
  }
  let user = await User.findOne({email: email});
  if(!user){
    const user = await User.create({
        name,
        email,
        password,
        avatar: { 
            public_id: "this is a sample id", 
            url: "porfileUrl" 
        },
      });
      res.status(200).json({
        success: true,
        user: user
    })
  }else{
      return next(new ErrorHandler("user already exists" , 400));
  }
});
