const express = require('express')
const helmet = require("helmet");
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

const app = express()

const mongoUrl = `mongodb+srv://rickard:${process.env.DB_PASSWORD}@cluster0.pn9qj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.use(express.json())

app.use(helmet({
      contentSecurityPolicy: {
            directives: {
                  defaultSrc: ["'self'"],
                  scriptSrc: ["'self'", "https://ajax.googleapis.com", "https://cdn.jsdelivr.net", "https://accounts.google.com", "https://apis.google.com"],
                  styleSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'", "https://accounts.google.com"],
                  imgSrc: ["'self'", "http:", "data:"],
                  frameSrc: ["'self'", "https://accounts.google.com"],
                  connectSrc: ["'self'", "https://accounts.google.com"]
            }
      },
}))

app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 1000 * 60 }, // We do not have https yet
      store: new MongoStore({ mongoUrl, collectionName: 'sessions' })
}))
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
            console.log('Listening on port ', process.env.PORT)
      })
}

const connectToDb = async () => {
      try {
            console.log('Connecting to db... ')
            await mongoose.connect(mongoUrl)
            console.log('DB connected')
      } catch (error) {
            console.error('Could not connect to db: ', error)
            throw error
      }
}

start()

