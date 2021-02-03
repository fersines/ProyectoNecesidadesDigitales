require("dotenv").config();//inserto serv
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Controladores nuevos
const {
  adminUser,
  deleteServicio,
  editUser,
  getServicio,
  getUser,
  listServicios,
  listUsers,
  newServicio,
  newUser,
  updateAmin,
  validateUser,
  deleteUser,
  newComentar,
  deleteComentar,
  listComentar,
  voteServicio
  } = require("./controllers/entries");

//Esto es un comentario de prueba antes del nuevo push

const { PORT } = process.env;

//Creo la app de express
const app = express();

//Aplico middlewares
app.use(morgan("dev"));
// Body parser (body en JSON)
app.use(bodyParser.json()); //Comentario realizado por [Israel] : no recuerdo para que lo hace

//Rutas de la API
//Post - userAdmin
app.post("/users/userLogin/",adminUser);

//Delete - /comentar/:id
//Borra un comentario de la BBDD
app.delete("/comentar/:id", deleteComentar);

//Delete - /servicios/:id
//Borra un servicio de la BBDD
app.delete("/servicios/:id", deleteServicio);

//Delete - /users/:id
//Borra un usuario de la BBDD
app.delete("/users/:id", deleteUser);

//Put - /usuarios/:id
//Permite al Admin modificar los datos de usuario en la BBDD
app.put("/users/:id", editUser);

//Get - /servicios/id
//Devuelve un único servicio
app.get("/servicios/:id", getServicio);

//Get - /users/id
//Devuelve un único usuario
app.get("/users/:id", getUser);

//GET - /comentar
//Devuelve todos los comentarios de la tabla comentar
app.get("/comentar", listComentar);

//Get - /servicios
//Devuelve todos los elementos de la tabla servicios
app.get("/servicios", listServicios);

//Get - /users
//Devuelve todos los usuarios de la tabla usuarios
app.get("/users", listUsers);

//Post - /comentar
//Añade un comentario al servicio
app.post("/comentar", newComentar);

//Post - /servicios
//Insertamos un servicio
app.post("/servicios", newServicio);

//Post - /user
//Insertamos un usuario
app.post("/insertar",newUser);

//Get - admin
//Insertar o modificar "admin"
app.post("/admin",updateAmin);

//Get - user
//Validar usuario
app.get("/validar/:registrationCode",validateUser); 

//Put - /servicios
//Añade puntuación a un servicio
app.put("/servicios/:id", voteServicio);

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
