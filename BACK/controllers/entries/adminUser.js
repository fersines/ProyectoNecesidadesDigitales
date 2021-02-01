/**
 * Duda con este end-point
 * 
 * Entiendo que se producirá cuando el usuario se introduzca, con lo que entiendo que
 * debe estar relacionado con el token, con lo que será por POST
 * Para el id, no olvidarse de 
 *  localhost:3000/users/userLogin?id_usuario=1
 * con la opcion de 'params' en postman
 */

const getDB = require("../../db");

const adminUser = async (req, res, next) => {
    let connection;
    const {id_usuario} = req.query;
    console.log(`El id: ${id_usuario}`)
  try {
    connection = await getDB();

    const [ranking] = await connection.query(`
    select usuarios.nom_usu ,sum(puntuacion)
    from servicios inner join solucionar
    on servicios.id_ser = solucionar.id_ser_sol
    join usuarios
    on usuarios.id_usu = solucionar.id_usu_sol
    where solucionar.solucionado = ?
    group by usuarios.id_usu
    order by sum(puntuacion) desc;
    
    `,[id_usuario]);
    //console.log(`El ranking con los usuarios:  ${ranking[0]}`);
    /*for(const prop in ranking){
        console.log(`${prop} = ${ranking[prop]}`);
        for(const contador in ranking[prop]){
            console.log(`Datos de ranking: ${contador} = ${ranking[prop][contador]}. \n nom_usu: ${ranking[prop]['nom_usu']} \n sum:  ${ranking[prop]['sum(puntuacion)']}`)
        }
    }*/
  const [misServicios] = await connection.query(`select * from servicios join solicitar
  on servicios.id_ser = solicitar.id_ser_soli
  where solicitar.id_usu_soli = ?;`,[id_usuario]);
  /*for(const j in misServicios){
      console.log(`${j}=${misServicios[j]}`)
      for(const k in misServicios[j]){
          console.log(`Datos de mis servicios: ${k} = ${misServicios[j][k]}, y accediendo a datos, en este caso a Título del servicio ${misServicios[j]['titulo_ser']} `)
      }
  }*/
  const [NumMisServSoli] = await connection.query(`select  count(id_ser) 
  from servicios join solicitar
    on servicios.id_ser = solicitar.id_ser_soli
    where solicitar.id_usu_soli = ?;`,[id_usuario]);
  const [misServiciosNoSolucionados] = await connection.query(`
  select titulo_ser,nombre_fich_ser,puntuacion 
  from servicios join solicitar
  on servicios.id_ser = solicitar.id_ser_soli
  where solicitar.id_usu_soli = ? and puntuacion = 0;`,[id_usuario]);

  const [misServiciosSolucionados] = await connection.query(`
  select titulo_ser,nombre_fich_ser,puntuacion from servicios join solicitar
on servicios.id_ser = solicitar.id_ser_soli
join solucionar on solucionar.id_ser_sol = solicitar.id_ser_soli
where solicitar.id_usu_soli = ? and solucionar.solucionado = 1;`,[id_usuario]);

  const [serviciosNoSolucionados] = await connection.query(
      `select nom_usu,solicitar.id_usu_soli,nombre_fich_ser,expli_ser,titulo_ser
        from usuarios join solicitar
        on usuarios.id_usu = solicitar.id_usu_soli
        join servicios on servicios.id_ser = solicitar.id_ser_soli
        where puntuacion = 0
        group by id_ser;`);


  const [serviciosSoluUserSolucionador] = await connection.query(`select usuarios.nom_usu as 'Usuario que lo soluciona',servicios.titulo_ser as 'Titulo',puntuacion
  from servicios join solucionar
  on servicios.id_ser = solucionar.id_ser_sol
  join usuarios
  on usuarios.id_usu = solucionar.id_usu_sol
  where (puntuacion > 0)
  group by servicios.id_ser;`);

  const [MisSolucionados] = await connection.query(`select  count(id_sol) 
  from solucionar where solucionado = 1 && id_usu_sol= ?;`, [id_usuario]);
     // Devuelvo un json con las entradas
     res.send({
        status: "ok",
        numMisSolucionados:MisSolucionados,
        numMisSolicitados:NumMisServSoli,
        clasificacion: ranking,
        serv: misServicios,
        misSerNoSolucionados : misServiciosNoSolucionados,
        misSerSolucionados: misServiciosSolucionados,
        servNoSolucionados: serviciosNoSolucionados,
        servSolUserSolucioador: serviciosSoluUserSolucionador,
      });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = adminUser;