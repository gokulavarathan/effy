var express = require('express');
var router = express.Router();
const validation = require('../helper/userValidation');
const companyController = require('../controller/companyController');
const userController = require('../controller/userController');

const mongoose = require('mongoose');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/", validation.postValidation,userController.user)

router.get("/listUser", userController.listUser)

router.get("/:id", userController.singledata)

router.put("/update/:id",validation.postValidation, userController.update)

router.delete("/delete/:id",userController.delete )

router.put("/deactivate/:id",userController.deactivate)
module.exports = router;
