const validator = require('node-validator');

let emptycheck = /([^\s])/;
let email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports.postValidation = (req, res, next) => {

    try {
        let path = req.route.path;
        let data = req.body;

        if (path == '/') {
            check = validator.isObject()
            .withRequired('firstName', validator.isString({ regex: emptycheck, message: "Please provide the firstName" }))
            .withRequired('lastName', validator.isString({ regex: emptycheck, message: "Please provide the LastName" }))
            .withRequired('emailId', validator.isString({ regex: email, message: "Please provide the email" }))
            .withRequired('designation', validator.isString({ regex: emptycheck, message: "Please provide the designation" }))
            .withRequired('dob', validator.isString({ regex: emptycheck, message: "Please provide the dob" }))
        
        }else if(path == '/update/:id'){
            check = validator.isObject()
            .withRequired('firstName', validator.isString({ regex: emptycheck, message: "Please provide the firstName" }))
            .withRequired('lastName', validator.isString({ regex: emptycheck, message: "Please provide the LastName" }))
            .withRequired('emailId', validator.isString({ regex: email, message: "Please provide the email" }))
            .withRequired('designation', validator.isString({ regex: emptycheck, message: "Please provide the designation" }))
            .withRequired('dob', validator.isString({ regex: emptycheck, message: "Please provide the dob" }))
        
        }

        validator.run(check, data, (errorcount, errors) => {
            if (errorcount == 0) {
                next();
            } else {
                let errormsg = '';
                for (let i = 0; i < errors.length; i++) {
                    if (errormsg != '') {
                        errormsg += ', ';
                    }
                    if (errors[i].message == 'Required value.' && errors[i].value == undefined) {
                        errors[i].message = errors[i].parameter + ' is required'
                    } else if (errors[i].value != undefined || errors[i].value == "" || errors[i].value == [] || errors[i].message == "Unexpected value.") {
                        errors[i].message = "Not a valid " + errors[i].parameter
                    } else {
                        errors[i].message = errors[i].message;
                    }
                    errormsg += errors[i].message;
                }
                res.json({ "status": false, "message": errormsg })
            }
        })
    } catch (e) {
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}
