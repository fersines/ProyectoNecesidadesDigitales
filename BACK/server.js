require("dotenv").config();//inserto serv
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
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
  insertThings
  deleteUser,
  newComentar,
  deleteComentar,
  listComentar,
  voteServicio
  } = require("./controllers/entries");

  const urls = {
    "userlogin":"/users/userLogin/",
    "serviciosid":"/servicios/:id",
    "usersid":"/users/:id",
    "servicios":"/servicios",
    "users":"/users",
    "insertar":"/insertar",
    "admin":"/admin",
    "validaregistrationCode":"/validar/:registrationCode",
    "usersolution":"/user/solution",
  };
//Esto es un comentario de prueba antes del nuevo push

const { PORT } = process.env;

//Creo la app de express
const app = express();

//Aplico middlewares
app.use(morgan("dev"));
// Body parser (body en JSON)
app.use(bodyParser.json()); //Comentario realizado por [Israel] : no recuerdo para que lo hace
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({
  createParentPath: true
}));

//Rutas de la API
//Post - userAdmin
app.post(urls.userlogin,adminUser);

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
app.get(urls.serviciosid, getServicio);

//Get - /users/id
//Devuelve un único usuario
app.get(urls.usersid, getUser);

//Insertar Solucion

app.post(urls.usersolution,insertThings);

//GET - /comentar
//Devuelve todos los comentarios de la tabla comentar
app.get("/comentar", listComentar);

//Get - /servicios
//Devuelve todos los elementos de la tabla servicios
app.get(urls.servicios, listServicios);

//Get - /users
//Devuelve todos los usuarios de la tabla usuarios
app.get(urls.users, listUsers);

//Post - /comentar
//Añade un comentario al servicio
app.post("/comentar", newComentar);

//Post - /servicios
//Insertamos un servicio
app.post(urls.servicios, newServicio);

//Post - /user
//Insertamos un usuario
app.post(urls.insertar,newUser);

//Get - admin
//Insertar o modificar "admin"
app.post(urls.admin,updateAmin);

//Get - user
//Validar usuario
app.get(urls.validaregistrationCode,validateUser); 



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
