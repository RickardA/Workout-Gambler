const express = require('express')
const app = express()
 
app.use(express.static('public'))

app.post('/login', function (req, res) {
  res.send('Hello World ', req.body)
})
 
app.listen(3000, (error) => {
      if(error) {
            console.error('Could not serve: ', error)
      }
      console.log('Listening on port 3000')
})