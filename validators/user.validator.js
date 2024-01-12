const { body } = require("express-validator");


class UserValidator {
    create(){
        return [
            body("username").exists().withMessage("add username!").isLength({max: 20}).withMessage("less than 20!"),
            body("password").exists().withMessage("add password!").isLength({min: 5 , max: 20}).withMessage("should be between 5 and 20 characters! "),
            body("email").exists().withMessage("add email!").isEmail().withMessage("email is not valid"),
        ];
    };

}


module.exports = new UserValidator();