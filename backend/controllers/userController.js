const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/users");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary = require('cloudinary');

//register a user with

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return next(
      new ErrorHandler("Password and confirmPassword do not match", 400)
    );
  }

  let user = await User.findOne({ email: email });
  if (!user) {
    let userObj = {
      name: name,
      email: email,
      password: password
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: "scale",
    });
    userObj.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
    const user = await User.create(userObj);
    const token = await user.getJWTToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      // secure: true
    });
    res.status(200).json({
      success: true,
      user: user,
    });
  } else {
    return next(new ErrorHandler("user already exists with this email", 400));
  }
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const token = await user.getJWTToken();

  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: true,
    signed: true,
    // secure: true
  });

  // Return json web token
  res.json({
    success: true,
    user: user,
  });
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('jwt', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logout successfully"
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isMatched = await user.isPasswordMatch(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password not matched"));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("New password and confirm password do not match"));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully"
  });
});


exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  console.log("user email is " , req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //get reset password token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/user/reset-password/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not request this email then Please Ignore it`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: `Ecommerce Password Recovery`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: true });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password and confirmPassword not matched", 400));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password successfully changed"
  });

});


//user routes

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user: user
  });
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newProfile = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar != "") {
    const user = await User.findById(req.user.id);
    const imageID = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageID);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: "scale",
    });
    newProfile.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true,
  });
})