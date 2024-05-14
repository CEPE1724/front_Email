const express = require('express');
const ResumenRouter = express.Router();
const carContoller = require('./controller');

// Ruta para obtener el resumen diario de ventas
ResumenRouter.get('/diario', carContoller.getResumenDiario);
ResumenRouter.get('/comisiones', carContoller.getResumenComisiones);
// Ruta para enviar correos de comisiones
ResumenRouter.post('/comisiones/email', carContoller.postEnviarCorreo);

module.exports = ResumenRouter;
