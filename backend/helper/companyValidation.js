const validator = require('node-validator');

let emptycheck = /([^\s])/;
let email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports.postValidation = (req, res, next) => {

    try {
        let path = req.route.path;
        console.log(path,"path")
        let data = req.body;

        if (path == '/') {
            check = validator.isObject()
            .withRequired('companyName', validator.isString({ regex: emptycheck, message: "Please provide the companyName" }))
            .withRequired('companyAddress', validator.isString({ regex: emptycheck, message: "Please provide the companyAddress" }))
            .withRequired('lat', validator.isNumber({ regex: emptycheck, message: "Please provide the Lattitude" }))
            .withRequired('lan', validator.isNumber({ regex: emptycheck, message: "Please provide the Longitude" }))
            
        }else if(path == '/update/:id'){
            check = validator.isObject()
            .withRequired('companyName', validator.isString({ regex: emptycheck, message: "Please provide the companyName" }))
            .withRequired('companyAddress', validator.isString({ regex: emptycheck, message: "Please provide the companyAddress" }))
            .withRequired('lat', validator.isNumber({ regex: emptycheck, message: "Please provide the Lattitude" }))
            .withRequired('lan', validator.isNumber({ regex: emptycheck, message: "Please provide the Longitude" }))
        }else if(path == '/addUser/:id'){
            check = validator.isObject()
            .withRequired('userId', validator.isString({ regex: emptycheck, message: "Please provide the user Id " }))
        }else if(path == '/removeUser/:id'){
            check = validator.isObject()
            .withRequired('userId', validator.isString({ regex: emptycheck, message: "Please provide the user Id " }))
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
        console.log("Error catched in validation", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}
