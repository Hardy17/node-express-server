
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
module.exports=app;