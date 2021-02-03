const getDB = require("../../db");

const listComentar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Saco queryString
    const { search } = req.query;

    let results;

    if (search) {
      [results] = await connection.query(
        `
            SELECT * FROM comentar
            WHERE id_usu_co LIKE ? OR comentario LIKE ?;
        `,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      //Leo los comentarios de la BBDD
      [results] = await connection.query(`
            SELECT * FROM comentar;
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

module.exports = listComentar;