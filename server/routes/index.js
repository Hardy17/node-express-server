
const express=require('express');
const app= express();

//ruta a usuarios
app.use(require("./usuario"));
//ruta a login
app.use(require("./login"));

//ruta a categorias
app.use(require('./categoria'));

//productos
app.use(require('./producto'));

//Subimos archivos
app.use(require('./uploads'));

//Servimos las imagenes al Frontend
app.use(require('./imagenes'));
module.exports=app;