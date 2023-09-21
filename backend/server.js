//SERVER ENTRY POINT
const express = require('express');
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

// Error handler after all routes to ensure its applied globally
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port: ${port}`))