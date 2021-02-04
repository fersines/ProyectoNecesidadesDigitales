/**
 * Este archivo realiza lo siguiente:
 * 
 *  1) Crear una carpeta donde se guardará el/los archivo/s,
 *     esta carpeta deberá ser única y estará dentro de la carpeta creada para 
 *     el usuario en el momento de 'activar la cuenta'.
 *  2) Guardará el archivo propuesto de solución
 *  3) Realizará la inserción de los datos a la tabla solucionar
 *  
 * @param {body,files} req  body recoje los id utilizados y files los ficheros
 * @param {*} res en este caso no enviamos nada al front
 * @param {*} next no tenemos ningún paso siguiente
 */

const getDB = require("../../db");
const { insertFiles } = require("../../helpers");

const insertThings = async (req, res, next)=>{
    
    let connection;   
    try {
        connection = await getDB();
        const {id_usuario,id_servicio} = req.body;
        const dato = {
            "usuario":`${id_usuario}`,
            "servicio":`${id_servicio}`
        }
        insertFiles(req.files,dato);

        //{Insertar en la bbdd el de usuario y del servicio en la tabla solucionar}

        await connection.query(`
        INSERT INTO solucionar(id_usu_sol,id_ser_sol) VALUES (?,?)  
        `,[dato.usuario,dato.servicio]); 
        res.send({
            status:"ok"
        });

    } catch (error) {
        next(error);
    }finally{
        if (connection) connection.release();
    }
};

module.exports = insertThings;