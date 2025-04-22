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
            logger.info(` Product found: ${product}`);
            res.status(200).json({status:true, data: result})
        } else {
            logger.warn(`Product not found: ${product}`);
            res.status(404).json({status:false , data: "Not Found"})
        }
    } catch (err) {
        logger.error(`Error while searching for product`, err);
        res.status(500).json({status: false, data: err});
    }
}

exports.create = async (req, res) => {
    console.log("Create Product");
    let data = req.body;

    const newProduct = new Product({
        product: data.product,
        cost: data.cost,
        description: data.description,
        quantity: data.quantity
    })

    try {
        const result = await newProduct.save();

        res.status(200).json({status:true, data: result})
    } catch (err) {
        logger.error("Error while creating new product");
        res.status(500).json({status: false, data: err});
    }
}

exports.update = async (req, res) => {
    const product = req.params.product;
    console.log("Update product with product name", product);

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await Product.findOneAndUpdate({product: product}, updateProduct, {new: true});
        if (result) {
            logger.info("INFO, Success in updating product")
            res.status(200).json({status: true, data: result})
        } else {
            logger.warn("WARN, problem in updating product")
            res.status(404).json({status:false , data: "Problem in updating product"})
        }
    } catch (err) {
        logger.error("Problem in updating product", err);
        res.status(500).json({status:false, data: err})
    }
}

exports.delete = async (req, res) => {
    const product = req.params.product;
    console.log("Delete product with product name: ", product);

    try {
        const result = await Product.findOneAndDelete({product: product});
        if (result) {
            logger.info(" Product deleted successfully");
            res.status(200).json({status: true, data: result});
        } else {
            logger.warn(" Product not found for deletion");
            res.status(404).json({status: false, data: "Not found"});
        }

    } catch (err) {
        logger.error("ERROR, Problem in deleting user", err);
        res.status(500).json({status: false, data: err})
    }
}