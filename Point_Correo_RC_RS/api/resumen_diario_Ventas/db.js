const sql = require('mssql');
require('dotenv').config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: false
  }
};

async function obtenerDatos() {
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }

    // Realizar consulta SQL
   // const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() );
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

      console.log('Fecha actual:', formattedDate);
    const desde = '20240509';
    const hasta = '20240509';
    const result = await pool.request()
      .input('Desde', sql.VarChar(8), formattedDate)
      .input('Hasta', sql.VarChar(8), formattedDate)
      .execute('ReporteDeVentasPorLocalEmail');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;

    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}

async function obtenerDatosComisiones() {
  try {
    // Conectar a la base de datos
    const pool = await sql.connect(config);

    // Verificar si la conexión fue exitosa
    if (pool.connected) {
      console.log('Conexión exitosa a la base de datos.');
    } else {
      console.log('La conexión a la base de datos no fue exitosa.');
    }

    // Realizar consulta SQL
   // const formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() );
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
    
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const formattedDateFirst = firstDayOfMonth.toISOString().slice(0, 10).replace(/-/g, '');


      console.log('Fecha actual:', formattedDate);
  
    const result = await pool.request()
      .input('Desde', sql.VarChar(8), formattedDateFirst)
      .input('Hasta', sql.VarChar(8), formattedDateFirst)//formattedDate
      .execute('Com_ResumenDeComisionesMensualesPorVendedorEmail');

    // Cerrar la conexión
    await sql.close();

    // Capturar el resultado y enviarlo en un objeto
    const datos = result.recordset;

    return { datos };
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    throw error;
  }
}

module.exports = { obtenerDatos, obtenerDatosComisiones};

