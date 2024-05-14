const model = require("./model");
const multer = require("multer");
require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require("fs");
// Configuración del transporte SMTP
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Configuración del almacenamiento de archivos adjuntos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Point_Correo_RC_RS/src/dir");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Middleware para la carga de archivos adjuntos
const upload = multer({ storage: storage });

// Controlador para obtener el resumen diario
exports.getResumenDiario = async (req, res) => {
  try {
    const data = await model.obtenerDatos();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Se produjo un error al procesar la solicitud.");
  }
};

exports.getResumenComisiones = async (req, res) => {
  try {
    const data = await model.obtenerDatosComisiones();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Se produjo un error al procesar la solicitud.");
  }
};

// Controlador para enviar correo electrónico
exports.postEnviarCorreo = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    console.log("El cuerpo de la solicitud está vacío");
  } else {
    console.log("El cuerpo de la solicitud tiene datos:", req.body);
  }
  console.log(res.json);
  const cssContent = fs.readFileSync('../Point_Correo_RC_RS/src/style.css', 'utf8');
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: "edisonnacional1@hotmail.com, edisonnacional1@gmail.com",
      subject: "resumen diario de ventas",
      html: ` 
      <style>
      ${cssContent}
    </style>
    <div class="horizontal-line"></div>
      <div class="card">
      <div class="heading">
        POINT TECHNOLOGY
        <span>Estimad@s.</span>
        <span>Se adjunta el resumen de comision y  diario de ventas a la fecha.</span>
      </div>      
      </div>
      </div>
      <div class="horizontal-line"></div>
    </div>`,
      attachments: [],
    };
    if (req.file) {
      mailOptions.attachments.push({
        filename: req.file.originalname,
        path: req.file.path,
      });
    } else {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      const day = ("0" + currentDate.getDate()).slice(-2);
      const fileName = `Ventas_${year}_${month}_${day}.xlsx`;
      const fileNameco = `Comisiones_${year}_${month}_${day}.xlsx`;
      mailOptions.attachments.push({
        filename: "Resumen_Diario_Ventas.xlsx",
        path: `C:/Users/Desarrollo/Downloads/${fileName}`,
      });
      mailOptions.attachments.push({
        filename: "Resumen_De_Comisiones.xlsx",
        path: `C:/Users/Desarrollo/Downloads/${fileNameco}`,
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
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
};
