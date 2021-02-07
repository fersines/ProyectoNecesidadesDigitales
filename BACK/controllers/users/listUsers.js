const getDB = require("../../db");

const listUsers = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Saco queryString
    const { search } = req.query;

    let results;

    if (search) {
      [results] = await connection.query(
        `
            SELECT * FROM usuarios
            WHERE nomUsuario_usu LIKE ? OR biografia_usu LIKE ?;
        `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      //Leo los servicios de la BBDD
      [results] = await connection.query(`
            SELECT * FROM usuarios;
        `);
    }

    //Devuelto un json con los servicios
    res.send({
      status: "ok",
      data: results,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listUsers;