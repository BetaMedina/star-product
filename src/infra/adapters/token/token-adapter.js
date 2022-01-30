const jwt = require('jsonwebtoken')

class TokenAdapter {
  generate ({ payload, expiresIn, key = process.env.PUBLIC_KEY_TOKEN }) {
    try {
      const jwtToken = jwt.sign(payload, key, { expiresIn: expiresIn })
      return jwtToken
    } catch (err) {}
  }

  verify ({ token, key = process.env.PUBLIC_KEY_TOKEN }) {
    try {
      return jwt.verify(token, key)
    } catch (err) {}
  }
}

exports.TokenAdapter = new TokenAdapter()
