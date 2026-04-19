const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const app = express();

// Allow requests from React frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.use(express.json());

// Routes
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/clients',   require('./routes/clients'));
app.use('/api/tasks',     require('./routes/tasks'));
app.use('/api/projects',  require('./routes/projects'));
app.use('/api/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));