const getDB = require("../../db");
const { formatDateToDB } = require("../../helpers");

const newServicio = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Saco queryString
    const { nombre_fich_ser, expli_ser, titulo_ser, puntuacion } = req.body;

    if (!nombre_fich_ser) {
      const error = new Error("El campo nombre_fich_ser es obligatorio");
      error.httpStatus = 400;
      throw error;
    }

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
    );

    const {inserId} = result;

/* "${faker.lorem.word()}",
        "${faker.lorem.words(15)}",
        "${formatDateToDB(now)}",
        "${faker.lorem.words(3)}",
        "${faker.random.number(10)}" */

    //Devuelto un json con los servicios
    res.send({
      status: "ok",
      data: {
        id: inserId,
        nombre_fich_ser,
        date: now,
        expli_ser, 
        titulo_ser,
        puntuacion,
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newServicio;