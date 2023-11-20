const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  salutation: { type: String },
  fullName: { type: String, required: true },
  sureName: { type: String },
  dateOfBirth: { type: Date },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String},
  phoneNumber: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  profilePicture: { type: String },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
