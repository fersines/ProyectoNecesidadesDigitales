const getDB = require("../../db");
const {generateRandomString,sendMail} = require("../../helpers");

const newEntry = async (req, res, next) => {
    let conexion;

    try{
        conexion = await getDB();

            // Recojo de req.body el email y la password

    
    const { email, password, nomUsuario_usu, nom_usu, ape1_usu, ape2_usu, biografia_usu, dni_usu } = req.body; 
    // Compruebo que no estén vacíos

    if (!email || !password || !nomUsuario_usu || !nom_usu || !ape1_usu || !ape2_usu  || !dni_usu ) {
      const error = new Error("Faltan campos");
      error.httpStatus = 400;
      throw error;
    }
    
      // Compruebo que no exista un usuario en la base de datos con ese email

      const [existingUser] = await conexion.query(
        `
        SELECT id_usu
        FROM usuarios
        WHERE mail=?
      `,
        [email]
      );

      
    if (existingUser.length > 0) {
        const error = new Error(
          "Ya hay un usuario en la base de datos con ese email"
        );
        error.httpStatus = 409;
        throw error;
      }
  
  
        
          // Creo un código de registro (contraseña temporal de un solo uso)
        const registrationCode = generateRandomString(10);
        await conexion.query(
            `
            INSERT INTO usuarios (nomUsuario_usu,nom_usu,ape1_usu,ape2_usu,biografia_usu,dni_usu,mail, pwd, codigoderegistro)
            VALUES (?,?,?,?,?,?,?,SHA2(?,512),?);
        `,[nomUsuario_usu,nom_usu,ape1_usu,ape2_usu,biografia_usu,dni_usu, email, password, registrationCode]);


            // ${process.env.PUBLIC_HOST}/users/validate/${registrationCode}
        const emailBody = `Te acabas de registrar en Servicios Digitales.
                            Pulsa en este link para verificar tu mail: ${process.env.PUBLIC_HOST}/validar/${registrationCode}`;

        await sendMail({
            to: email,
            subject: 'Activa tu usuario de Servicios Digitales',
            body: emailBody,

        });


        res.send({
            menssage: "insertado?",
        });

    } catch(error){
        next(error);
    } finally {
        if (conexion) conexion.release();
    }
}

module.exports = newEntry;