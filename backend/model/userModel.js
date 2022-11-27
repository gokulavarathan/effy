const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    // "userId": { type: Number, index: true, require: true },
    emailId: { type: String, index: true },
    activeStatus: { type: Boolean, default:true },
    designation: { type: String },
    companyDetails: { type: mongoose.Schema.Types.ObjectId, default: null },
    dob: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

userSchema.index({ emailId: 1 });

module.exports = mongoose.model("createUser",userSchema, "userschema");
