require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./models/database');
const healthCheckRoute = require('./routes/healthCheck');
const notFoundRoute = require('./routes/notFound');
const companyRoutes = require('./routes/companyRoutes');
const loginRoutes = require('./routes/loginRoutes');
const otpRoutes = require('./routes/otpRoutes');
const teamRoutes = require('./routes/teamRoutes'); 
 // Import the OTP routes

// Create an instance of the express application
const app = express();

// Define middlewares for the application
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/otp', otpRoutes);
app.use('/api/auth',loginRoutes);
app.use('/api/team', teamRoutes);
app.use(healthCheckRoute);
app.use(companyRoutes);
app.use(notFoundRoute);

// Error handling for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'The requested resource does not exist' });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start the server and connect to the database
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  try {
    await connectDb();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1); // Exit the process with failure
  }
});
