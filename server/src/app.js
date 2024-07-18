// server/src/app.js
const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./database');
const createDummyData = require('./dummyData');
const restaurantRoutes = require('./routes/restaurantRoutes'); // Import the restaurant routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Welcome to the TablesApp API');
});

app.use('/api/restaurants', restaurantRoutes); // Use the restaurant routes

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ force: true });
    console.log('Database synced');
    await createDummyData();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
