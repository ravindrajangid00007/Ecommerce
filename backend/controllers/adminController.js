const Product = require("../models/products");
const User = require("../models/users");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require('cloudinary');
exports.getAllAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    product: products,
  });
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users: users,
  });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  console.log(user);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  console.log(user);
  if(user.avatar != "") {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "deleted user successfully",
  });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "user updated successfully",
  })
});
