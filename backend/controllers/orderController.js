const Order = require('../models/orders');
const Product = require('../models/products');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");


const updateStock = async (productId, orderedQuantity) => {
    const product = await Product.findById(productId);
    product.stock -= orderedQuantity;

    await product.save({ validateBeforeSave: false });
}
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    console.log(req.body);
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id,

    });
    order.orderItems.forEach(async (o) => {
        await updateStock(o.productId, o.quantity);
    });
    res.status(201).json({
        success: true,
        order
    });
});

//get single order item
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    console.log("oRDER AT SIGNLE OREDER", order);
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

//get my orders order

exports.myOrder = catchAsyncError(async (req, res, next) => {
    console.log("user order is", req.user);
    const orders = await Order.find({});
    res.status(200).json({
        success: true,
        orders,
    });
});


//get all order  for admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => totalAmount += order.totalPrice);
    res.status(200).json({
        success: true,
        orders,
        totalAmount
    });
});

//update order status for admin

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    order.orderStatus = req.body.status;
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});


//delete order only admin 

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }
    await order.remove();
    res.status(200).json({
        success: true,
    })
})