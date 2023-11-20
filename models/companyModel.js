const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  industry: { type: String },
  foundingDate: { type: Date },
  website: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  revenue: { type: Number },
  openingHours: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      startTime: { type: String },
      endTime: { type: String },
    },
  ],
  employees: [
    {
      name: { type: String },
      position: { type: String },
      email: { type: String },
      phoneNumber: { type: String },
    },
  ],
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
