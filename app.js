const express = require('express');
const { errorHandler } = require('./middleware/errormiddleware')
const connectDB = require('./config/db');
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const goalsRoutes = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')

// Connect Database
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/goals", goalsRoutes)
app.use("/api/users", userRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));