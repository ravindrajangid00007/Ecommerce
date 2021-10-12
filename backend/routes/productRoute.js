const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
router.get('/list' , productController.getAllProducts);
router.post('/create' , productController.createProduct);
router.put('/update/:id' , productController.updateProduct);
router.delete('/delete/:id' , productController.deleteProduct);
router.get('/details/:id' , productController.productDetails);
module.exports = router;