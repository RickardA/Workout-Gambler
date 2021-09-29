const express = require('express')
const helmet = require("helmet");
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()

app.use(helmet())
app.use(express.static('public'))

app.post('/login', function (req, res) {
      res.send('Hello World ', req.body)
})

app.listen(3000, (error) => {
      if (error) {
            console.error('Could not serve: ', error)
      }
      console.log('Listening on port 3000')
})


const connectToDb = async () => {
      try {
            console.log('Connecting to db... ')
            await mongoose.connect(`mongodb+srv://rickard:${process.env.DB_PASSWORD}@cluster0.pn9qj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
            console.log('DB connected')
      } catch (error) {
            console.error('Could not connect to db: ', error)
      }
}

connectToDb()