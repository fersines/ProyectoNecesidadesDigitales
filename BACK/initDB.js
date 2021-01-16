const faker = require("faker");
const { random } = require("lodash");
const getDB = require("./db");
const { formatDateToDB } = require("./helpers");

const now = new Date();

let connection;

async function main() {
  try {
    connection = await getDB();

    //Introduzco varios usuarios

    const usuarios = 25;

    for (let index = 0; index < usuarios; index++) {
      await connection.query(`
        INSERT INTO usuarios(
            id_usu,
            nomFoto_usu,
            nomUsuario_usu,
            nom_usu,
            ape1_usu,
            ape2_usu,
            biografia_usu,
            mail)
        VALUES(
            "${faker.random.number(9999)}",
            "${faker.lorem.word()}",
            "${faker.internet.userName()}",
            "${faker.name.firstName()}",
            "${faker.name.lastName()}",
            "${faker.name.lastName()}",
            "${faker.lorem.paragraph()}",
            "${faker.internet.email()}")
    `);
    }

    console.log("Usuarios creados");
      
    //Introduzco varios servicios
    const servicios = 50;

    for (let index = 0; index < servicios; index++) {
      await connection.query(`
        INSERT INTO servicios(
            id_ser,
            nombre_fich_ser,
            expli_ser,
            fecha_ser_ini,
            titulo_ser,
            puntuacion) 
        VALUES(
            "${faker.random.number(9999)}",
            "${faker.lorem.word()}",
            "${faker.lorem.words(15)}",
            "${formatDateToDB(now)}",
            "${faker.lorem.words(3)}",
            "${faker.random.number(10)}")
    `);
    }

    console.log("Servicios creados");
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
