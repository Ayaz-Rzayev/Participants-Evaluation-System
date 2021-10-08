const nodemailer = require('nodemailer');

module.exports.avg = (args) => {
  return args.reduce((a, b) => a + b, null) / args.length;
}
 
module.exports.sendEmail = async(email, subject, msgText) => {
  try {
    const transporter = nodemailer.createTransport({
  //    host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    })
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: msgText
    })
  }catch(err){
    console.log(`email not sent to ${email}`)
    console.log(err)
  }
}