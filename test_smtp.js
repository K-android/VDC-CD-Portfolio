const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "karthikraj.v.nadar@gmail.com",
    pass: "yjjmbkublyubdjyn",
  },
});
transporter.verify().then(() => console.log("Success")).catch(err => console.error(err.message));
