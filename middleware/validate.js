const { body, validationResult } = require("express-validator");

const validate = (req, res, next )=> {
    const validationErrors = validationResult(req)
    if(validationErrors.isEmpty()){
        return next()
    }

    console.log(validationErrors)

    const extractedErrors = [];
    validationErrors.array().map((err)=> extractedErrors.push({massage:err.msg, field: err.path}));

    res.json(extractedErrors);
};

module.exports = {validate};