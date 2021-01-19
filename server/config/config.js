

//Puerto de node
process.env.PORT=process.env.PORT || 3000;

//Fecha de vencimiento  de token
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN=60*60*24*30;

// SEED de autenticacion
process.env.SEED=process.env.SEED ||'SEED_DEV';

// Entorno de node
process.env.NODE_ENV=process.env.NODE_ENV || 'dev'
let urlBD;

if(process.env.NODE_ENV==='production'){
    urlBD=process.env.MONGO_URI
    
}else{
    urlBD='mongodb://localhost:27017/cafe';
}

process.env.URLDB=urlBD;