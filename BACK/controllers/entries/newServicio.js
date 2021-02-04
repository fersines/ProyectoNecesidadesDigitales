const getDB = require("../../db");
const { formatDateToDB } = require("../../helpers");
//const { result } = require("lodash");

const newServicio = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Saco queryString
    const { nombre_fich_ser, expli_ser, titulo_ser ,id_usu} = req.body;

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

   await connection.query(`INSERT INTO servicios(nombre_fich_ser,expli_ser,fecha_ser_ini,titulo_ser) VALUES(?,?,?,?);`, [nombre_fich_ser, expli_ser, formatDateToDB(now), titulo_ser]);

   const [id]= await connection.query(`SELECT id_ser FROM servicios WHERE titulo_ser = ?;`,[titulo_ser]);

   await connection.query(`INSERT INTO solicitar(id_ser_soli,id_usu_soli) VALUES (?,?);`,[id[0]['id_ser'],id_usu]);


   /*Para aclara por pantalla como sale de la bbdd*/
    for(const prop in id){
      console.log(`${prop} = ${id[prop]}`);
      for(const contador in id[prop]){
          console.log(`O id leido: ${contador} = ${id[prop][contador]}. \n}`)
      }
    }
    console.log(`O id leído ${id[0]['id_ser']}`);
    console.log(`O id doutro xeito: ${id[0].id_ser}`);

    



    //Devuelto un json con los servicios
    res.send({
      status: "ok",
      idLeido:id,
      idDoutroxeito:id[0].id_ser
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newServicio;