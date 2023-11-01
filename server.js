const express = require('express');
const connectDB = require('./config/db.js');
const path = require('path');
const cors = require("cors");

const app = express();
  
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Connect Database 
connectDB();

// Init Middleware 
app.use(express.json()); 

express().use(express.static('public')); //to access the files in public folder

app.use(express.urlencoded({extended:true}));

// Define Routes
app.use('/api/admins', require('./routes/api/signup.js'));
app.use('/api/auth', require('./routes/api/login.js'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
