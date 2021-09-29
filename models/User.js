const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({
      sub: { type: String, required: true },
      email: { type: String, required: true },
      given_name: { type: String, required: true },
      family_name: { type: String, required: true },
      locale: { type: String, required: false },
      iat: { type: Number, required: true },
      exp: { type: Number, required: true },
});

module.exports = db.model('User', user);