

//Puerto de node
process.env.PORT=process.env.PORT || 3000;

//Fecha de vencimiento  de token
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN='48h';

// SEED de autenticacion
process.env.SEED=process.env.SEED ||'SEED_DEV';

// Entorno de node
process.env.NODE_ENV=process.env.NODE_ENV || 'dev'
let urlBD;

if(process.env.NODE_ENV==='dev'){
    urlBD='mongodb://localhost:27017/cafe';
}else{
    urlBD=process.env.MONGO_URI
}

process.env.URLDB=urlBD;


//google client id

process.env.CLIENTID=process.env.CLIENT_ID ||"810011577674-hgvcc1bj8ej4idin70j3o53pco229v5q.apps.googleusercontent.com"