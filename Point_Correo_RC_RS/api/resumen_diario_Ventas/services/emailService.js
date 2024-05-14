const nodemailer = require("nodemailer");

function enviarCorreo(mailOptions) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "mail.facturaspoint.net",
      port: 587,
      secure: false,
      auth: {
        user: "comprobantes5@facturaspoint.net",
        pass: "2024PointT",
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
        reject(error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
        resolve(info);
      }
    });
  });
}

module.exports = { enviarCorreo };
