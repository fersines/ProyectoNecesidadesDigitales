const getDB = require("../../db");
const { formatDateToDB } = require("../../helpers");
const { result } = require("lodash");

const newServicio = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Saco queryString
    const { nombre_fich_ser, expli_ser, titulo_ser, puntuacion, id_usu_soli, id_ser_soli } = req.body;

    if (!nombre_fich_ser) {
      const error = new Error("El campo nombre_fich_ser es obligatorio");
      error.httpStatus = 400;
      throw error;
    }

    /* if (!id_ser_soli) {
      const error = new Error("No hay servicio asociado");
      error.httpStatus = 400;
      throw error;
    } */

    const now = new Date();

    const [result] = await connection.query(`
    INSERT INTO servicios(
        nombre_fich_ser,
        expli_ser,
        fecha_ser_ini,
        titulo_ser,
        puntuacion)
    VALUES(?,?,?,?,?);
    `,
    [nombre_fich_ser, expli_ser, formatDateToDB(now), titulo_ser, puntuacion]
    ) /* && 
    (`
    INSERT INTO solicitar(
        id_usu_soli,
        id_ser_soli)
    VALUES(?,?);
    `,
    [id_usu_soli, id_ser_soli]
    ) */;

    const {inserId} = result;

//Mete el nuevo servicio, pero no lo veo en la tabla solicitar
//Aquí habría que comprobar que el usuario exista y que se 
//asocie el servicio que se acaba de crear

    //Devuelto un json con los servicios
    res.send({
      status: "ok",
      data: {
        id_ser: inserId,
        nombre_fich_ser,
        date: now,
        expli_ser, 
        titulo_ser,
        puntuacion,
        id_usu_soli,
        id_ser_soli,
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newServicio;