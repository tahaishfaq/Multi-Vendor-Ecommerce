const jwt = require('jsonwebtoken');

const vendorAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization; 
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], 'Vendor'); 
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token verification failed' });
  }
};

module.exports = vendorAuthMiddleware;
