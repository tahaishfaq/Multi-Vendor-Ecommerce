const Vendor = require('../models/vendorModel');
const Company = require('../models/companyModel');


const createCompany = async (req, res) => {
  const vendorId = req.user.vendorId;
  const { name, description, industry, foundingDate, website, email, phoneNumber, address } = req.body;

  try {
    const existingVendor = await Vendor.findById(vendorId).populate('companyId');

    if (existingVendor.companyId) {
      return res.status(400).json({ error: 'Vendor already has a company' });
    }

    const newCompany = new Company({
      name,
      description,
      industry,
      foundingDate,
      website,
      email,
      phoneNumber,
      address,
    });

    const savedCompany = await newCompany.save();

    existingVendor.companyId = savedCompany._id;
    await existingVendor.save();

    res.status(201).json({ message: 'Company created successfully', company: savedCompany });
  } catch (error) {
    console.error('Create Company Error:', error);
    res.status(500).json({ error: 'Company creation failed' });
  }
};


const addOpeningHours = async (req, res) => {
    const companyId = req.params.companyId;
    const { day, startTime, endTime } = req.body;
  
    try {
      const company = await Company.findById(companyId);
  
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }

      company.openingHours.push({ day, startTime, endTime });
      await company.save();
  
      res.status(200).json({ message: 'Opening hours added successfully', company });
    } catch (error) {
      console.error('Add Opening Hours Error:', error);
      res.status(500).json({ error: 'Failed to add opening hours' });
    }
  };

  const aboutCompany = async (req, res) => {
    const companyId = req.params.companyId; 
    const { description } = req.body;
  
    try {
      
      const company = await Company.findById(companyId);
  
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }

      company.description = description;
      await company.save();
  
      res.status(200).json({ message: 'Company description added successfully', company });
    } catch (error) {
      console.error('Add Company Description Error:', error);
      res.status(500).json({ error: 'Failed to add company description' });
    }
  };

  const addEmployee = async (req, res) => {
    const companyId = req.params.companyId; 
    const { name, position, email, phoneNumber } = req.body;
  
    try {
      const company = await Company.findById(companyId);
  
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
  
      company.employees.push({ name, position, email, phoneNumber });
      await company.save();
  
      res.status(200).json({ message: 'Employee added successfully', company });
    } catch (error) {
      console.error('Add Employee Error:', error);
      res.status(500).json({ error: 'Failed to add employee' });
    }
  };

module.exports = {
  createCompany,
  addOpeningHours,
  aboutCompany,
  addEmployee

};

