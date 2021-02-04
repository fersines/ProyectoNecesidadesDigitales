const getDB = require("../../db");

const editEntry = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { id } = req.params;

        //Comprobamos que existe el usuario con ese id

        const [current,] = await connection.query(`SELECT id_usu FROM usuarios WHERE id_usu=?`,[id]);
            
        //Si no existe devolver un 404

        if (current.length === 0) {
            const error = new Error(
                "No existe ningún usuario en la BBDD con ese id_usu"
            );
            error.httpStatus = 404;
            throw error;
        }

        //Comprobar que tenemos los datos mínimos en el body

        const {
            nomFoto_usu, 
            nomUsuario_usu, 
            nom_usu,
            ape1_usu,
            ape2_usu,
            biografia_usu,
            mail,
            pwd,
            rol, 
            activado,
            borrado,
            codigoRegistro
        } = req.body;

    if (!nomUsuario_usu || !nom_usu || !mail) {
        const error = new Error("Faltan campos!");
        error.httpStatus = 400;
        throw error;
    }

    //Hacer la query del UPDATE

    await connection.query(
        `UPDATE usuarios SET nomFoto_usu=?, 
        nomUsuario_usu=?, 
        nom_usu=?,
        ape1_usu=?,
        ape2_usu=?,
        biografia_usu=?,
        mail=?,
        pwd=?,
        rol=?, 
        activado=?,
        borrado=?,
        codigoRegistro=?
        WHERE id_usu=?`,
        [   
            nomFoto_usu, 
            nomUsuario_usu, 
            nom_usu,
            ape1_usu,
            ape2_usu,
            biografia_usu,
            mail,
            pwd,
            rol, 
            activado,
            borrado,
            codigoRegistro,
            id
        ]
    );

        res.send({
            status: "OK",
            data: {
                id,
            nomFoto_usu, 
            nomUsuario_usu, 
            nom_usu,
            ape1_usu,
            ape2_usu,
            biografia_usu,
            mail,
            pwd,
            rol, 
            activado,
            borrado,
            codigoRegistro,
            },
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editEntry;