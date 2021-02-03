const getDB = require("../../db");
//const { formatDateToDB } = require("../../helpers");
const { result } = require("lodash");

const newComentar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Saco queryString
    const { id_usu_co, id_ser_co, comentario , id_usu, id_ser} = req.body;

 /*    if (!id_usu_co) {
      const error = new Error("Falta el id_usu");
      error.httpStatus = 400;
      throw error;
    }

    if (!id_ser_co) {
      const error = new Error("Falta el id_ser");
      error.httpStatus = 400;
      throw error;
    } */

//const now = new Date();

await connection.query(`INSERT INTO comentar(id_usu_co, id_ser_co, comentario) VALUES(?,?,?);`, [id_usu, id_ser, comentario]);

/*    const [id]= await connection.query(`SELECT id_co FROM comentar WHERE  = ?;`,[comentario]);

   await connection.query(`INSERT INTO comentar(id_ser_soli,id_usu_soli) VALUES (?,?);`,[id[0]['id_ser'],id_usu]);
 */

   /*Para aclara por pantalla como sale de la bbdd*/
    /* for(const prop in id){
      console.log(`${prop} = ${id[prop]}`);
      for(const contador in id[prop]){
          console.log(`O id leido: ${contador} = ${id[prop][contador]}. \n}`)
      }
    }
    console.log(`O id leído ${id[0]['id_ser']}`);
 */
    



    //Devuelto un json con el comentario
    res.send({
      status: "ok",
      data: {
        id_usu_co,
        id_ser_co,
        comentario,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newComentar;