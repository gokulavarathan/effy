var express = require('express');
var router = express.Router();
const validation = require('../helper/companyValidation');
const companyController = require('../controller/companyController');
const userController = require('../controller/userController');

const mongoose = require('mongoose');

/* GET home page. */
router.get('/testroute', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//add location https://maps.google.com/maps/api/geocode/json?address=${location}&sensor=false&key=AIzaSyBp68RmeQVmhQRdujiPMyfMonea_C483PY
router.post("/", validation.postValidation,companyController.company)

router.get("/list", companyController.listCompany)

router.get("/:id", companyController.singledata)

router.put("/update/:id",validation.postValidation, companyController.update)


router.put("/addUser/:id",validation.postValidation,companyController.addUser )


router.put("/removeUser/:id",validation.postValidation,companyController.removeUser )

router.delete("/delete/:id",companyController.delete )


module.exports = router;
