const getDB = require("../../db");

const getServicio = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Saco el id de los parámetros de ruta
    const { id } = req.params;

    //Hago la query
    const [result] = await connection.query(
      `
        SELECT *
        FROM servicios WHERE id_ser = ?
        `,
      [id]
    );
    //Desestructuro el elemento de los resultados
    const [single] = result;

    if (!single) {
      //El elemento no existe
      const error = new Error("El servicio no existe");
      error.httpStatus = 404;
      throw error;
    }

    //Sacamos el fichero del servicio

    const [ file, ] = await connection.query(
      `SELECT nombre_fich_ser, fecha_ser_ini FROM servicios WHERE id_ser=?`,
      [id]
    );

    console.log(file);

    res.send({
      status: "Ok",
      data: {
        ...single,
        file,},
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getServicio;
