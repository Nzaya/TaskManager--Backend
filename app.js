const express = require('express')
const mongoose = require('mongoose')
const app = express()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const tasks = require('./routes/tasks')

//Middleware
app.use(express.static('./public'))
app.use(express.json())


//Connect to db
const db = require('./config/keys').MongoURI

//Connect to mongoose
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err))



//routes
app.use('/api/v1/tasks', tasks)

//middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

PORT = process.env.PORT || 3000;

app.listen(PORT, (console.log(`Server running on port ${PORT}...`)))