const express = require("express");
const database = require("../api/resumen_diario_Ventas/db");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "mail.facturaspoint.net",
  port: 587, 
  secure: false,
  auth: {
    user: "comprobantes5@facturaspoint.net",
    pass: "2024PointT",
  },
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../Point_Correo_RC_RS/src/dir'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  const upload = multer({ storage: storage });

app.post("/enviar-correo", upload.single('adjunto'), async (req, res) => {
    try {
      const mailOptions = {
        from: "comprobantes5@facturaspoint.net",
        to: req.body.destinatario,
        subject: req.body.asunto,
        text: req.body.contenido,
        attachments: []
      };
      if (req.file) {
        mailOptions.attachments.push({
          filename: req.file.originalname,
          path: req.file.path
        });
      }else{
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() );
        const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
        const year = currentDate.getFullYear();
        const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        const day = ("0" + currentDate.getDate()).slice(-2);
        const fileName = `Ventas_${year}_${month}_${day}.xlsx`;
        mailOptions.attachments.push({
            filename: 'Resumen_Diario_Ventas.xlsx',
            path: `C:/Users/Desarrollo/Downloads/${fileName}` 
          });
      }

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
          res.status(500).send("Error al enviar el correo electrónico");
        } else {
          console.log("Correo electrónico enviado:", info.response);
          res.status(200).send("Correo electrónico enviado correctamente");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Se produjo un error al procesar la solicitud.");
    }
  });
  
const PORT =  3050;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
