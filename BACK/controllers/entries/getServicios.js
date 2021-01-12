const getDB = require("../../db");

const getServicios = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Saco el id de los parámetros de ruta
    const { id } = req.params;

    //Hago la query
    const [result] = await connection.query(
      `
        SELECT id_ser, nombre_fich_ser, iniciado_ser, expli_ser, solucionado_ser, fecha_fich_ini, titulo_ser
        FROM servicios WHERE id_ser = ?
        `,
      [id]
    );
    //Desestructuro el elemento de los resultados
    const [single] = result;

    if (!single.id === null) {
      //El elemento no existe
      const error = new Error("El elemento no existe");
      error.httpStatus = 404;
      throw error;
    }

    res.send({
      status: "Ok",
      data: single,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getServicios;
