const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product: {
        type: String,
        required: [true, "Product name is required field"],
        max: 50,
        unique: true
    },
    cost: {
        type: Number,
        required: [true, "Product cost is required field"]
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    },
    {
        collection: 'products',
        timestamps: true
    
    });

module.exports = mongoose.model("Product", productSchema);