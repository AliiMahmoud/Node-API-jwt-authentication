// requiring the person model
const userModel = require('../models/user/user');
// requiring the user schema validator
const userSchema = require('../models/user/userSchema');
// Md5 for hashing the password
var md5 = require('md5');
// JWT to generate the tokens
const jwt = require('jsonwebtoken');


/**
 * Middleware function to add a registered user into DB 
 * and generate JWT for API authentication
 * after validation
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.register = async function (req, res) {
    let { email, password } = req.body
    // validating the email and the hash with the schema
    let { error } = userSchema.register.validate({ email, password })
    if (error) {
        res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
    }
    else {
        // generating the hash
        let hash = md5(password)
        // checking if it already exists
        const userExists = await userModel.getUser({ email })
        if (userExists == null) {
            let inserted = await userModel.insertUser({ email, password: hash });
            if (inserted.acknowledged)
                res.status(201).json({ success: 'true', message: 'user created successfully', data: { id: inserted.insertedId, email, Token: getnerateToken({ id: inserted.insertedId, email }) } })
            else
                res.status(500).json({ success: 'false', message: 'Something went wrong' })
        }
        else
            res.status(400).json({ success: 'false', message: "user already exists" })
    }
}

/**
 * Middleware function to login a user 
 * and generates and sends JWT for API authentication
 * after validating the data
 * @param req - express Request handler Object
 * @param res - express Response Object
 */
module.exports.login = async function (req, res) {
    let { email, password } = req.body
    // validating the email and the password with the schema
    let { error } = userSchema.login.validate({ email, password })
    if (error) {
        res.status(500).json({ success: 'false', message: error.details[0].message.replace(/"/g, '') })
    }
    else {
        // generating the hash
        let hash = md5(password)
        // checking if it already exists
        const userExists = await userModel.getUser({ email, password: hash })
        if (userExists == null)
            res.status(404).json({ success: 'false', message: 'Wrong email or password' })
        else
            res.status(200).json({ success: 'true', message: 'Successful login', data: { id: userExists._id, email, Token: getnerateToken({ id: userExists._id, email }) } })
    }
}

/**
 * Generates the taken (JWT) with expiry date after 10 days
 * @param {Object} user - user data
 * @param {String} user.id - user's unique id
 * @param {String} user.email - email
 * @returns access token JWT
 */
let getnerateToken = function (user) {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 10); // valid for 10 days
    return jwt.sign({
        id: user.id,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.SECRET);
}