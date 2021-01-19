
const express=require('express');
const app= express();

//ruta a usuarios
app.use(require("./usuario"));
//ruta a login
app.use(require("./login"));

module.exports=app;