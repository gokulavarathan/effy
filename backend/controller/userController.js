
const company = require('../model/companyModel')
const user = require('../model/userModel')
const mongoose = require("mongoose");


exports.user=((req, res) => {
        try {
            var data = req.body
            user.create(data, (err, userCreated) => {
                if (userCreated) {
                    res.status(201).send({ status: true, msg: "New user created successfully" })
                } else {
                    res.status(400).send({ status: false, msg: "Error Occur while creating new user", error: err })
    
                }
            })
        } catch {
            (e) => {
                res.status(400).send({ status: false, msg: "Went wrong", error: e })
            }
        }
    
    }
)

exports.listUser=((req, res) => {
    try {
        user.find({}, (err, data) => {
            if (data) {
                res.status(200).send({ status: true, data: data, msg: "Available users list" })
            } else {
                res.status(400).send({ status: false, msg: "Error Occur while fetching users data", err: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})

exports.singledata=((req, res) => {
    try {
        user.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, data) => {

            if (data) {
                company.find({ _id: mongoose.Types.ObjectId(data[0].companyDetails) }, (comErr, comData) => {
                    if (comData) {                        
                        var response = [...data, ...comData]; 
                        res.status(200).send({ status: true, data: response, msg: "Available user list" })
                        
                    } else {
                        res.status(400).send({ status: false, msg: "Error Occur while fetching comapny data", err: comErr })
                    }
                })
                
            } else {
                res.status(400).send({ status: false, msg: "Error Occur while fetching user data", err: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})

exports.update=(async (req, res) => {
    try {
        
        var value = req.body
        await user.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, data) => {
            if (!err) {
                if (data.length != 0) {
                    var where = { _id: data[0]._id }
                    
                    user.updateOne(where, value, (error, updated) => {
                        if (!error) {
                            res.status(200).send({ status: true, msg: "User updated  succesfully" })
                        } else {
                            res.status(400).send({ status: false, msg: "Error Occur while updating user data", error: error })
                        }
                    })

                } else {
                    res.status(200).send({ status: true, data: data, msg: "No data found" })
                }
            }
            else {
                res.status(400).send({ status: false, msg: "Error Occur while updating user data", error: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }

})

exports.delete=(async (req, res) => {
    try {

        await user.find({ _id:mongoose.Types.ObjectId( req.params.id )}, (err, data) => {
            
            if (!err) {
                if (data.length != 0) {
                    var where = { _id: data[0]._id }
                    
                    user.deleteOne(where, (error, updated) => {
                        if (!error) {
                            res.status(200).send({ status: true,  msg: "user Deleted succesfully" })
                        } else {
                            res.status(400).send({ status: false, msg: "Error Occur while  Deleting user data", error: error })
                        }
                    })

                } else {
                    res.status(200).send({ status: true, data: data, msg: "No data found" })
                }
            }
            else {
                res.status(400).send({ status: false, msg: "Error Occur while  Deleting user data", error: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }

})

exports.deactivate=(async (req, res) => {
    try {
        await user.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, data) => {
            if (!err) {
                if (data.length != 0) {
                    var where = { _id: data[0]._id }
                    user.updateOne(where, {$set:{activeStatus:false}}, (error, updated) => {
                        if (!error) {
                            res.status(200).send({ status: true, msg: "Account Deactivated succesfully" })
                        } else {
                            res.status(400).send({ status: false, msg: "Error Occur while Deactivated  Account", error: error })
                        }
                    })

                } else {
                    res.status(200).send({ status: true, data: data, msg: "No data found" })
                }
            }
            else {
                res.status(400).send({ status: false, msg: "Error Occur while Deactivated  Account", error: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }

})


