// Importar los módulos necesarios
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Importar body-parser
const corsOptions = {
  origin: '*', // Permitir todas las solicitudes de cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var resumenDiarioRouter = require('./api/resumen_diario_Ventas/router');
app.use('/api/v1/resumen', resumenDiarioRouter);
var port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
