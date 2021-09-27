// requiring the person model
const userModel = require('../models/user');
// requiring the user schema validator
const userSchema = require('../validators/userSchema');
// Md5 for hashing the password
var md5 = require('md5');
// JWT to generate the tokens
const jwt = require('jsonwebtoken');


/**
 * Middleware function to add a registered user into DB 
 * and generate JWT for API authentication
 * after validation
 * @param {import('express').RequestHandler} req - express Request handler Object
 * @param {import('express').Response} res - express Response Object
 */
module.exports.register = async function (req, res) {
    let { username, password } = req.body
    // validating the username and the hash with the schema
    let { error } = userSchema.validate({ username, password })
    if (error) {
        res.status(500).json({ message: error.details[0].message.replace(/"/g, '') })
    }
    else {
        // generating the hash
        let hash = md5(password)
        // checking if it already exists
        const userExists = await userModel.getUser({ username })
        if (userExists == null) {
            let inserted = await userModel.insertUser({ username, hash });
            if (inserted.acknowledged)
                res.status(201).json({ message: 'created Successfully', user: { id: inserted.insertedId, username }, Token: getnerateToken({ id: inserted.insertedId, username }) })
            else
                res.status(500).json({ message: 'Something went wrong!' })
        }
        else
            res.status(400).json({ message: "username already exists" })
    }
}

/**
 * Middleware function to login a user 
 * and generates and sends JWT for API authentication
 * after validating the data
 * @param {import('express').RequestHandler} req - express Request handler Object
 * @param {import('express').Response} res - express Response Object
 */
module.exports.login = async function (req, res) {
    let { username, password } = req.body
    // validating the username and the password with the schema
    let { error } = userSchema.validate({ username, password })
    if (error) {
        res.status(500).json({ message: error.details[0].message.replace(/"/g, '') })
    }
    else {
        // generating the hash
        let hash = md5(password)
        // checking if it already exists
        const userExists = await userModel.getUser({ username, hash })
        if (userExists == null)
            res.status(404).json({ message: 'Wrong username or password' })
        else
            res.status(201).json({ message: 'Successful', user: { id: userExists._id, username }, Token: getnerateToken({ id: userExists._id, username }) })
    }
}

/**
 * Generates the taken (JWT) with expiry date after 10 days
 * @param {Object} user - user data
 * @param {String} user.id - user's unique id
 * @param {String} user.username - username
 * @returns access token JWT
 */
let getnerateToken = function (user) {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 10); // valid for 10 days
    return jwt.sign({
        id: user.id,
        username: user.username,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.SECRET);
}