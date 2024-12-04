const express = require('express');
const bodyParser = require('body-parser');
const expensesRoutes = require('./routes/expenses'); // Importing the routes

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());


app.use('/expenses', expensesRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));