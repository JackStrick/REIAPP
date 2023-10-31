//SERVER ENTRY POINT
const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/error');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use("/api/property", require('./routes/propertyRoutes'))

// Serve static assets from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Create a catch-all route to serve the React app's HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/build', 'index.html'));
});

// Error handler after all routes to ensure its applied globally
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port: ${port}`))