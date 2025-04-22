const express = require("express");
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.findAll);

router.get('/:product', productController.findOne)


module.exports = router;