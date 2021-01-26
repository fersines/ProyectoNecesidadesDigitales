require("dotenv").config();//inserto serv
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Controladores
const {
  listServicios,
  deleteServicio,
  newUser,
  getServicio,
  validateUser,
  updateAmin
  } = require("./controllers/entries");

const { PORT } = process.env;

//Creo la app de express
const app = express();

//Aplico middlewares
app.use(morgan("dev"));
// Body parser (body en JSON)
app.use(bodyParser.json()); //Comentario realizado por [Israel] : no recuerdo para que lo hace
//Rutas de la API

//Get - /servicios
//Devuelve todos los elementos de la tabla servicios
app.get("/servicios", listServicios);

//Get - /servicios/id
//Devuelve un único servicio
app.get("/servicios/:id", getServicio);

//Post - /user
//Insertamos un usuario
app.post("/insertar",newUser);

//Get - user
//Validar usuario
app.get("/validar/:registrationCode",validateUser); 

//Get - admin
//Insertar o modificar "admin"
app.post("/admin",updateAmin);

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
