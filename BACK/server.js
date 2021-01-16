require("dotenv").config();
const express = require("express");

const morgan = require("morgan");

//Controladores
const {
  listServicios,
  getServicios,
  newUser
  } = require("./controllers/entries");

const { PORT } = process.env;

//Creo la app de express
const app = express();

//Aplico middlewares
app.use(morgan("dev"));

//Rutas de la API

//Get - /servicios
//Devuelve todos los elementos de la tabla servicios
app.get("/servicios", listServicios);

//Get - /servicios/id
//Devuelve sólo un servicio
app.get("/servicios/:id", getServicios);

//Middleware de error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

//Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not Found",
  });
});

//Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionado en http://localhost:${PORT}`);
});
