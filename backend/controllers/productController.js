const Product = require("../models/products");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require('cloudinary');
//create product -->only admin

exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if(typeof(req.body.images) == 'string'){
    images.push(req.body.images);
  }else{
    images = req.body.images;
  }
  let imagesLinks = [];
  for(let i = 0; i < images.length; i++){
    const result = await cloudinary.v2.uploader.upload(images[i] , {folder: "products"});
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url
    });
  }
  req.body.user = req.user.id;
  req.body.images = imagesLinks;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product: product,
  });
});

//get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  let apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let  products = await apifeatures.query; 
  const filteredProductsCount = products.length;
  apifeatures.pagination(resultPerPage);
  products = await apifeatures.query;
  res.status(200).json({
    success: true,
    product: products,
    productsCount: productsCount,
    resultPerPage: resultPerPage,
    filteredProductsCount: filteredProductsCount
  });
});



//update product -->only admin

exports.updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  let images = [];
  if(typeof req.body.images === 'string'){
    images.push(req.body.images);
  }else{
    //if images present then array of images will be revived else images type will be undefined
    images = req.body.images;
  }

  if( images != undefined ){ 
    //destroy all existing images
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    let imagesLinks = [];
    //upload images present in req.body
    for (let i  = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i] , {folder:"products"});
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url
      });
    }

    req.body.images = imagesLinks;
  }


  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
    product: product,
  });
});

//delete product -->only admin
exports.deleteProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  // deleting images 
  for(let i=0;i<product.images.length;i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  } 
  await product.remove();
  return res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

// product details

exports.productDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  .populate({
    path: 'reviews',
    populate: {
      path: 'user',
      model: 'User'
    }
  });
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  return res.status(200).json({
    success: true,
    product: product,
  });
});

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = Number(rating);
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let sum = 0;
  product.reviews.forEach((rev) => {
    sum += rev.rating;
  });

  product.ratings = sum / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "review added successfully",
  });
});

//get all reviews of a product

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
