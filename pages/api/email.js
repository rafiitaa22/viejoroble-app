const nodemailer = require("nodemailer");
import dayjs from "dayjs";
import "dayjs/locale/es";

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
    console.log(req.body)
    dayjs.locale("es");
    const data = req.body;
    console.log("datos", data);
    const text = `
    Nombre: ${data.nombre} 
    Teléfono: ${data.phone} 
    Fecha: ${dayjs(data.date).format("dddd")}, ${data.day}-${data.month}-${data.year
      } a las ${data.hour}h 
    Comensales: ${data.comensales} + " comensales " ${data.tronas && " - " + data.tronas + " tronas"
      } ${data.carros && " - " + data.carros + " carros"} 
    Comentario: ${data.comentario}


    http://www.elviejoroblesabadell.es/admin/
    `;

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
      to: process.env.BOOKING_ADMIN_MAIL,
      subject: "NUEVA RESERVA",
      text: text,
    };
    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log("Err", err);
        res
          .status(500)
          .end(JSON.stringify({ message: "Error sending email!" }));
        return;
      } else {
        console.log("Inf", info);
        res.status(200).end(JSON.stringify({ message: "Email sent!" }));
        return;
      }
    });
  }
}
