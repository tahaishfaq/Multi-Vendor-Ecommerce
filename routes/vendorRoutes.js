const express = require('express');
const router = express.Router();
const {registerVendor, loginVendor, updatePassword, updateVendorProfile} = require('../controllers/VendorController');
const vendorAuthMiddleware = require('../middlewares/vendorAuthMiddleware');
const multer = require('multer'); 

router.post('/register', registerVendor);
router.post('/login', loginVendor)
router.put('/update-password', vendorAuthMiddleware,updatePassword)
router.put('/update-profile', vendorAuthMiddleware, updateVendorProfile);

module.exports = router;
