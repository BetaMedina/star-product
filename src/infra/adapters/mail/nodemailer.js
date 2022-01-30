const nodemailer = require('nodemailer')

class EmailAdapter {
  constructor () {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })
  }

  send ({ payload }) {
    return this.transporter.sendMail(payload)
  }
}

exports.EmailAdapter = new EmailAdapter()
