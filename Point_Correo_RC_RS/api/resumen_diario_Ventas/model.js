const database = require("./db");
const emailService = require("./services/emailService");
exports.obtenerDatos = async () => {
    const data = await database.obtenerDatos();
    return data;
};

exports.enviarCorreo = async (mailOptions) => {
    try {
        await emailService.enviarCorreo(mailOptions);
    }
    catch (error) {
        console.error('Error:', error);
        throw new Error('Se produjo un error al enviar el correo electrónico.');
    }
};

exports.obtenerDatosComisiones = async () => {
    const data = await database.obtenerDatosComisiones();
    return data;
};
