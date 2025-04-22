const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger')

exports.findAll = async(req, res) => {
    console.log("Find all users from collection users");
    
    try {
        const result = await User.find();

        res.status(200).json({status: true, data: result});
        logger.info("INFO, Success in reading all users");
    } catch (err){
        console.log("Problem in reading users: ", err);
        res.status(400).json({status: false, data: err});
        logger.error("ERROR, Problem in reading all users", err);
    }
}

exports.findOne = async(req, res) => {
    console.log("Find user with specific username");
    let username = req.params.username;

    try {
        const result = await User.findOne({username: username});

        if (result) {
            res.status(200).json({status: true, data: result});
        } else {
            res.status(404).json({status: false, data: "Not found"});
        }
        
    } catch (err){
        console.log("Problem in finding user: ", err);
        res.status(400).json({status: false, data: err});
    }
}

exports.create = async(req, res) => {
    console.log("Create User ");

    let data = req.body;

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);


    const newUser = new User({
        username: data.username,
        password: hashedPassword,
        name: data.name,
        surname: data.surname,
        email: data.email,
        address: {
            area: data.address.area,
            road: data.address.road
        }
    })

    try{
        const result = await newUser.save();

        res.json({status: true, data: result});
    } catch (err) {
        
        console.log("Problem in creating user: ", err);
        res.json({status: false, data: err});

    }
}

exports.update = async(req, res) => {
    const username = req.params.username;
    console.log("Update user with username", username)

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: {
            area: req.body.address.area,
            road: req.body.address.road
        }
    }

    try {
        const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true});

        if (result) {
            res.status(200).json({status: true, data: result});
        } else {
            res.status(404).json({status: false, data: "Not found"});
        }

    } catch (err){
        console.log("Problem in updating user: ", err);
        res.status(400).json({status: false, data: err});
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username;
    console.log("Delete user with username", username)

    try {
        const result = await User.findOneAndRemove({username: username});

        if (result) {
            res.status(200).json({status: true, data: result});
        } else {
            res.status(404).json({status: false, data: "Not found"});
        }

    } catch (err){
        console.log("Problem in deleting user: ", err);
        res.status(400).json({status: false, data: err});
    }
}