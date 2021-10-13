const express = require('express');
const router = express.Router();

router.use('/product', require('./productRoute'));
router.use('/user' , require('./userRoute'));
module.exports = router;