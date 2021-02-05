/**
 * Duda con este end-point
 * 
 * Entiendo que se producirá cuando el usuario se introduzca, con lo que entiendo que
 * debe estar relacionado con el token, con lo que será por POST
 * Para el id, no olvidarse de 
 *  localhost:3000/users/userLogin?id_usuario=1
 * con la opcion de 'params' en postman
 */
const {datosServicios,rank, elServicios,numServSoli} = require("../../helpers");
const getDB = require("../../db");
const adminUser = async (req, res, next) => {
    let connection;
    const {id_usuario} = req.query;
    console.log(`El id: ${id_usuario}`)
  try {
    connection = await getDB();

    const [Solucionados] = await datosServicios(1);
    const [NoSolucionados] = await datosServicios(0);
    const [ranking] = await rank();   
    const [misServicios] = await elServicios(id_usuario);
 
  const [NumMisServSoli] = await numServSoli(id_usuario);
  const [misServiciosNoSolucionados] = await connection.query(`
  select titulo_ser,nombre_fich_ser,puntuacion 
  from servicios join solicitar
  on servicios.id_ser = solicitar.id_ser_soli
  where solicitar.id_usu_soli = ? and puntuacion = 0;`,[id_usuario]);

  const [misServiciosSolucionados] = await connection.query(`
  select titulo_ser,nombre_fich_ser,puntuacion from servicios join solicitar 
  on servicios.id_ser = solicitar.id_ser_soli join solucionar on solucionar.id_ser_sol = solicitar.id_ser_soli
  where solicitar.id_usu_soli = ? and solucionar.solucionado = 1;`,[id_usuario]);


  const [MisSolucionados] = await connection.query(`select  count(id_sol) 
  from solucionar where solucionado = 1 && id_usu_sol= ?;`, [id_usuario]);
  
  const [comentSinLer] = await connection.query(`select count(sinleer) from comentar join usuarios
  on usuarios.id_usu = comentar.id_usu_co
  where sinleer = 1 and id_usu_co = ?`,[id_usuario]);
  const [comentSinVer] = await connection.query(`select count(sinver) from comentar join usuarios
  on usuarios.id_usu = comentar.id_usu_co
  where sinver = 1 and id_usu_co = ?`,[id_usuario]);
  
     // Devuelvo un json con las entradas
     res.send({
        status: "ok",
        ranking:ranking,
        serviSolucionados: Solucionados,
        serviciosNoSolucionados: NoSolucionados,
        numComentariosSinver: comentSinVer,
        numComentariosSinLer: comentSinLer,
        numMisSolucionados:MisSolucionados,
        numMisSolicitados:NumMisServSoli,
        misSerNoSolucionados : misServiciosNoSolucionados,
        misSerSolucionados: misServiciosSolucionados,
        serv: misServicios,

      });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = adminUser;