const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const vendorRoutes = require('./routes/vendorRoutes')
const companyRoutes = require('./routes/companyRoutes');

const app = express();
const port = process.env.PORT || 4000;

// Connect to your MongoDB database (replace 'your-database-uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://multi-vendor:E03fz6ZZwxYpdkGq@cluster0.o38y1du.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed', err));
  

app.use(cors());
app.use(bodyParser.json());

app.use('/vendor', vendorRoutes);
app.use('/company', companyRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
