const express = require('express');
const vendorAuthMiddleware = require('../middlewares/vendorAuthMiddleware');
const { createCompany, addOpeningHours, aboutCompany, addEmployee } = require('../controllers/companyController');
const router = express.Router();



router.post('/create-company', vendorAuthMiddleware, createCompany);
router.post('/add-opening-hours/:companyId', vendorAuthMiddleware, addOpeningHours);
router.post('/about-company/:companyId', vendorAuthMiddleware, aboutCompany);
router.post('/add-employee/:companyId', vendorAuthMiddleware, addEmployee);


module.exports = router;
