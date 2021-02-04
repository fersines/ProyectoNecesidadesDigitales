const getDB = require("../../db");

const voteServicio = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Recojo los parámetros
    const { id } = req.params;
    const { puntuacion } = req.body;

   /*  // Lo dejo preparado hasta decidir el rago de la puntuación
    if (vote < 1 || vote > 5) {
      const error = new Error("El voto debe estar entre 1 y 5");
      error.httpStatus = 400;
      throw error;
    } */

    // Compruebo que la puntuación la da el usuario que creo el servicio
    const [current] = await connection.query(
      `
      SELECT id_ser_soli
      FROM solicitar
      WHERE id_ser_soli=?
    `,
      [id]
    );

    if (current[0] === id) {
      const error = new Error("No puedes votar la entrada de otro");
      error.httpStatus = 403;
      throw error;
    }

    const now = new Date();

    // Añado la puntuación al servicio
    //meto la fecha por si se considera que al votar una ya lo damos por cerrado
    await connection.query(
      `
      UPDATE servicios SET fecha_ser_fin=?, puntuacion=?
      WHERE id_ser=?
    `,
      [now, puntuacion, id]
    );

    res.send({
      status: "ok",
      data: {
        id_ser_soli: id,
        puntuacion: puntuacion,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = voteServicio;