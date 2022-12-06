require("dotenv").config;

const nodemailer = require("nodemailer");
function sendEmail(mail_configs) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_EM,
      pass: process.env.MAIL_PW,
    },
  });

  transporter.sendMail(mail_configs, function (error, info) {
    if (error) {
      console.log(error);
      return reject({ message: "An error has occured" });
    }
    return resolve({ message: "Email sent successfully" });
  });
}

const EmailSender = ({ email, reason, start_date, end_date }) => {
  // console.log(email);
  const mail_configs = {
    from: process.env.MAIL_EM,
    to: process.env.SEND_TO,
    subject: "Leave Application",
    text: "Leave Request",
    html: `<div>
    <p style="font-weight:800; font-size:1.2rem">Leave Request</p>
      <div style=" font-size:0.8rem margin:0 30px;">
        <p>Requested By: <b>${email}</b></p>
        <p>Reason: <b>${reason}</b></p>
        <p>Start Date: <b>${start_date}</b></p>
        <p>End Date: <b>${end_date}</b></p>
      </div>
    </div>`,
  };
  sendEmail(mail_configs);
};
module.exports = EmailSender;
