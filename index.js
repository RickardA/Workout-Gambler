const express = require('express')
const helmet = require("helmet");
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(express.static('public'))
app.use('/auth', require('./routes/auth'))

global.db = mongoose.connection

global.models = {
      User: require('./models/User'),
}

const start = async () => {
      try {
            await connectToDb()
            listen()
      } catch (error) {
            console.error('Could not start required services, exiting....')
            process.exit()
      }
}

const listen = () => {
      app.listen(process.env.PORT, (error) => {
            if (error) {
                  console.error('Could not serve: ', error)
                  throw error
            }
            console.log('Listening on port 3000')
      })
}

const connectToDb = async () => {
      try {
            console.log('Connecting to db... ')
            await mongoose.connect(`mongodb+srv://rickard:${process.env.DB_PASSWORD}@cluster0.pn9qj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
            console.log('DB connected')
      } catch (error) {
            console.error('Could not connect to db: ', error)
            throw error
      }
}

start()

