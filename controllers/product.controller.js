const Product = require('../models/product.model');
const logger = require('../logger/logger')

exports.findAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({status: true, data: products});
        logger.info("INFO, Success in reading all products");
    } catch (err) {
        res.status(400).json({status: false, data: err});
        logger.error("ERROR, Problem in reading products", err);
    }
}

exports.findOne = async (req, res) => {
    console.log("Find a product with specific name");
    let product = req.params.product;

    try {
        const result = await Product.findOne({product: product});
        if (result) {
            res.status(200).json({status:true, data: result})
        } else {
            res.status(400).json({status:false , data: "Not Found"})
        }
    } catch (err) {
        console.log("Problem in finding product: ", err);
        res.status(400).json({status: false, data: err});
    }
}