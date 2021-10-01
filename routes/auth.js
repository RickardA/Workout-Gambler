const { OAuth2Client } = require('google-auth-library');
const express = require('express')

const CLIENT_ID = process.env.CLIENT_ID

const router = express.Router()
const client = new OAuth2Client(CLIENT_ID);

router.post('/login', async (req, res) => {
      try {
            console.log('Request ', req.body)
            const { id_token } = req.body
            const payload = await verify(id_token)
            const user = checkUserInDb(payload)
            req.session.user = user
            res.redirect('/restrictedSites/index.html')
      } catch (error) {
            console.error('Error in login: ', error)
            res.status(500).send('Something went wrong')
      }
})

const verify = async (idToken) => {
      const ticket = await client.verifyIdToken({
            idToken,
            audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log('Payload ', payload)
      return payload
}

const checkUserInDb = async (payload) => {
      console.log('Check user in db, payload: ', payload)
      const user = await global.models.User.findOne({ sub: payload.sub })
      if(!user) {
            console.log('User does not exist in db')
            return saveUserInDb(payload)
      }
      console.log('User in db ', user)
      return user
}

const saveUserInDb = async (payload) => {
      console.log('Saving user in db: ', payload)
      const user = await global.models.User.create(payload)
      console.log('User created ', user)
      return user
}

module.exports = router