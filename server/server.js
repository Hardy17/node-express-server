require("./config/config");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require('path');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//configuracion de rutas 
app.use(require("./routes/index"));

//Dar permiso a la  carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("Base de Datos online");
  }
);

app.listen(process.env.PORT, () => {
  console.log("Escuchando el puerto", process.env.PORT);
});
