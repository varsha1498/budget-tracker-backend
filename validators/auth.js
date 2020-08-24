const {check} = require("express-validator");
const { isEmpty } = require("lodash");


const MIN = 6;

exports.userSignupValidator = [
 check("name").not().isEmpty().withMessage("Name is required"),
 check("email").isEmail().withMessage("Must be a valid EMail"),
 check("password").isLength({min: MIN}).withMessage(`Password must be atleast  ${MIN} characters long! `)
 
];