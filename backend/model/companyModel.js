const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, require: true, index: true },
    companyAddress: { type: String, require: true },
    cityName: { type: String, require: true },
    postalCode: { type: Number, require: true },
    countryName: { type: String, require: true },
    lat: { type: Number, require: true },
    lan: { type: Number, require: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

companySchema.index({ companyName: 1 });

module.exports = mongoose.model("createCompany",companySchema, "companyschema");
