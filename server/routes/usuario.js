const express = require("express");
const Usuario = require("../models/usuario");
const _ = require("underscore");
const bcrypt = require("bcrypt");
const app = express();

app.get("/usuario", function (req, res) {
  
  let desde = Number(req.query.desde) || 0;
  let limite =Number(req.query.limite)|| 5;
  Usuario.find({estado:true},'nombre email role estado google img')
         .skip(desde)
         .limit(limite)
         .exec((err, usuario)=>{

          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }

          Usuario.countDocuments({estado:true},(err,conteo)=>{
            res.json({
              ok: true,
              usuario,
              cuantos:conteo
            });

          })
         })

});
//Crear Registro
app.post("/usuario", function (req, res) {
  let body = req.body;
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});
//actualizar registro
app.put("/usuario/:id", function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img","role", "estado"]);

  Usuario.findByIdAndUpdate(id, body, { new: true,runValidators:true, context: 'query' }, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

app.delete("/usuario/:id", function (req, res) {
 //Borrado fisico de la BD
  // let id =req.params.id;
  // Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{

  //   if(err){
  //     return res.status(400).json({
  //       ok:false,
  //       err
  //     })
  //   }
  //   if(!usuarioBorrado){
  //     return res.status(400).json({
  //       ok:false,
  //       err:{
  //         message:'Usuario no encontrado'
  //       }
  //     })
  //   }
  //   res.json({
  //     ok:true,
  //     usuario:usuarioBorrado
  //   })
  // })

  let id= req.params.id;
  let estado= {
    estado:false
  }
  Usuario.findByIdAndUpdate(id,estado, { new: true },(err,usuarioBorrado)=>{
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    if(!usuarioBorrado){
      return res.status(400).json({
        ok:false,
        err:{
          message:'Usuario no encontrado'
        }
      })
    }
    res.json({
      ok: true,
      usuario: usuarioBorrado,
    });

  })
});

module.exports = app;
