const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const config = {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    };
    let transporter = nodemailer.createTransport(config);

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    let message = {
      from: process.env.MAIL_USER,
      to: "rafiitaa22@gmail.com",
      subject: "Ejemplo2",
      text: "Hello SMTP Email",
    };
    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log("Err", err);
      } else {
        console.log("Inf", info);
      }
    });

    res.status(200).end(JSON.stringify({ message: "Send Mail" }));
  }
}
