
const company = require('../model/companyModel')
const user = require('../model/userModel')
const mongoose = require("mongoose");


exports.company=((req,res)=>{
    try {
        var data = req.body
        company.create(data, (err, companyCreated) => {
            if (companyCreated) {
                res.status(201).send({ status: true, msg: "New Company created successfully" })
            } else {
                res.status(400).send({ status: false, msg: "Error Occur while creating new comapny", error: err })

            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})


exports.listCompany=((req,res)=>{
    try {
        company.find({}, (err, data) => {
            if (data) {
                res.status(200).send({ status: true, data: data, msg: "Available company list" })
            } else {
                res.status(400).send({ status: false, msg: "Error Occur while fetching comapny data", err: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})

exports.singledata=((req,res)=>{
    try {
        company.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, data) => {
            
            if (data) {
                res.status(200).send({ status: true, data: data, msg: "Available company list" })
            } else {
                res.status(400).send({ status: false, msg: "Error Occur while fetching comapny data", err: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})

exports.update=(async (req,res)=>{
    try {
        var value = req.body
        await company.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, data) => {
            if (!err) {
                if (data.length != 0) {
                    var where = { _id: data[0]._id }
                    company.updateOne(where, value, (error, updated) => {
                        if (!error) {
                            res.status(200).send({ status: true, msg: "Updated succesfully" })
                        } else {
                            res.status(400).send({ status: false, msg: "Error Occur while updating comapny data", error: error })
                        }
                    })

                } else {
                    res.status(200).send({ status: true, data: data, msg: "No data found" })
                }
            }
            else {
                res.status(400).send({ status: false, msg: "Error Occur while fetching comapny data", error: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})

exports.addUser=(async(req,res)=>{
    try {
        var value = req.body.userId
        var companyId = req.params.id
        await company.find({ _id:mongoose.Types.ObjectId( companyId )}, (err, data) => {
            if (!err) {
                if (data.length != 0) {
                    user.find({ _id: mongoose.Types.ObjectId(value) }, (usererr, userData) => {
                        if(!usererr){
                          var where = { _id:userData[0]._id}
                          if(userData[0].companyDetails == null){
                          user.updateOne(where, {$set:{companyDetails:companyId}}, (error, updated) => {
                            if (!error) {
                                res.status(200).send({ status: true, msg: "Updated succesfully" })
                            } else {
                                res.status(400).send({ status: false, msg: "Error Occur while adding User data", error: error })
                            }
                        })
                    }else{
                        res.status(200).send({ status: false, msg: "Remove this user from existing company and add new company to the user" })
                    }
                        }else{
                            res.status(200).send({ status: false, data: data, msg: "No data found" })
                        }
                    })
                    
                } else {
                    res.status(200).send({ status: false, data: data, msg: "No data found" })
                }
            }
            else {
                res.status(400).send({ status: false, msg: "Error Occur while fetching comapny data", error: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})

exports.removeUser=(async(req,res)=>{
    try {
        var companyId = req.params.id;
        var value = req.body.userId
        await company.find({ _id: mongoose.Types.ObjectId(companyId) }, (err, data) => {
            if (!err) {
                if (data.length != 0) {
                    user.find({ _id:mongoose.Types.ObjectId( value) }, (usererr, userData) => {
                        if(!usererr){
                          var where = { _id:userData[0]._id}
                          user.updateOne(where, {$set:{companyDetails:null}}, (error, updated) => {
                            if (!error) {
                                res.status(200).send({ status: true, msg: "Removed succesfully" })
                            } else {
                                res.status(400).send({ status: false, msg: "Error Occur while removing User data", error: error })
                            }
                        })
                        }
                    })
                    
                } else {
                    res.status(200).send({ status: true, data: data, msg: "No data found" })
                }
            }
            else {
                res.status(400).send({ status: false, msg: "Error Occur while removing comapny data", error: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})

exports.delete=(async(req,res)=>{
    try {

        var value = req.body
        await company.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, data) => {
            
            if (!err) {
                if (data.length != 0) {
                    var where = { _id: data[0]._id }
                    
                    company.deleteOne(where, (error, updated) => {
                        if (!error) {
                            res.status(200).send({ status: true,  msg: "Deleted succesfully" })
                        } else {
                            res.status(400).send({ status: false, msg: "Error Occur while updating comapny data", error: error })
                        }
                    })

                } else {
                    res.status(200).send({ status: true, data: data, msg: "No data found" })
                }
            }
            else {
                res.status(400).send({ status: false, msg: "Error Occur while fetching comapny data", error: err })
            }
        })
    } catch {
        (e) => {
            res.status(400).send({ status: false, msg: "Went wrong", error: e })
        }
    }
})


