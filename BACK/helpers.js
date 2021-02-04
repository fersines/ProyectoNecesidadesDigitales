const { format } = require("date-fns");
const sgMail = require('@sendgrid/mail');
const path = require("path");
const crypto = require("crypto");
const fs = require("fs").promises;

sgMail.setApiKey('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');
const getDB = require("./db");
//se manda como un objeto, y este ya lo desestructura en 'to','subject' y 'body'
async function sendMail({to,subject,body}){
    try{
            const msg = {
                    to,
                    from: process.env.SENDGRID_FROM, // Use the email address or domain you verified above
                    subject,
                    text: body,
                    html: `
                    <div>
                        <h1>${subject}</h1>
                        <p>${body}</p>
                    <strong>and easy to do anywhere, even with Node.js</strong>
                    </div>
                    `
                };
            await sgMail.send(msg);
    }catch(error){
        console.log(error)
        throw new Error("Error enviando mail");
    }
}

// Genera una cadena de caracteres aleatoria
function generateRandomString(length) {
    return crypto.randomBytes(length).toString("hex");
  }
function formatDateToDB(dateObject) {
  return format(dateObject, "yyyy-MM-dd HH:mm:ss");
}

async function uploadFile(mifichero,datos) {
  
  try{
    const dir = path.join(__dirname,`./${datos.carpeta}/${datos.servicio}/${datos.usuario}/`);
    mifichero.mv(`${dir}` + mifichero.name);
  }catch(error){
    console.error(error.message);
  }
}

function insertFiles(ficheros,datos){

  for (const archivo in ficheros){
    uploadFile(ficheros[archivo],datos);
  }
}

async function makeDir(nameDir){
  try {
    
    const dir = path.join(__dirname,`docs/solucion/${nameDir}`);

    await fs.mkdir(dir, {recursive: true});
    console.log("Los directorios fueron creados");

  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  formatDateToDB,sendMail,generateRandomString,makeDir,uploadFile,insertFiles
};
