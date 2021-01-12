const faker = require("faker");
const { random } = require("lodash");
const getDB = require("./db");
const { formatDateToDB } = require("./helpers");

const now = new Date();

async function main() {
  try {
    connection = await getDB();

    const servicios = 10;

    for (let index = 0; index < servicios; index++) {
      await connection.query(`
        INSERT INTO servicios(
            id_ser,
            nombre_fich_ser,
            expli_ser,
            fecha_fich_ini,
            titulo_ser) 
        VALUES(
            "${faker.random.number(9999)}",
            "${faker.lorem.word()}",
            "${faker.lorem.words(15)}",
            "${formatDateToDB(now)}",
            "${faker.lorem.words(3)}")
    `);
    }

    console.log("Usuarios creados");
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
