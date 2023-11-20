const Vendor = require("../models/vendorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Vendor Registration
const registerVendor = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and confirmPassword do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor({
      fullName,
      email,
      password: hashedPassword,
    });

    const savedVendor = await vendor.save();

    res.status(201).json(savedVendor);
  } catch (error) {
    res.status(400).json({ error: "Vendor registration failed" });
  }
};

// Vendor Login
const loginVendor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, vendor.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Your password is wrong" });
    }
    // Generate a JWT token for authentication
    const token = jwt.sign(
      { vendorId: vendor._id, email: vendor.email },
      "Vendor",
      { expiresIn: "2d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const vendorId = req.user.vendorId;

  try {
    const vendor = await Vendor.findById(vendorId);
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      vendor.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirmation do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    vendor.password = hashedPassword;

    await vendor.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Password update failed" });
  }
};

const updateVendorProfile = async (req, res) => {
    const vendorId = req.user.vendorId;
    const updateData = req.body; 
  
    try {
      const vendor = await Vendor.findById(vendorId);
  
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }

      for (const key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          vendor[key] = updateData[key];
        }
      }

      await vendor.save();
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Profile Update Error:', error);
      res.status(500).json({ error: 'Profile update failed' });
    }
  };

  
  
module.exports = { registerVendor, loginVendor, updatePassword, updateVendorProfile, };
