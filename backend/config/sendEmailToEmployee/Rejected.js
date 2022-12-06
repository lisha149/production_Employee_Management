require("dotenv").config;
const nodemailer = require("nodemailer");
function leaveRejected(mail_configs) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ADMIN,
      pass: process.env.MAIL_ADMINPW,
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

const EmailSender = ({ email, status, rejected_reason }) => {
  console.log(email);
  const mail_configs = {
    from: process.env.MAIL_ADMIN,
    to: email,
    subject: "Leave Application",
    text: "Leave Request Reply",
    html: `<div>
         <p style="font-weight:800; font-size:1.2rem">Leave Request Reply</p>

        <p>
            Your leave application has been <b>${status}</b>. Thank you. 
        </p>
        <p>Rejected Reason: <b>${rejected_reason}</b>. </p>
        </div>
      `,
  };
  leaveRejected(mail_configs);
};
module.exports = EmailSender;
