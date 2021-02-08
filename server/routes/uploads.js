const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario= require('../models/usuario');
const Producto=require('../models/producto');
const fs =require('fs');
const path=require('path');
// default options
app.use(fileUpload({ useTempFiles: true }) );

//usamos peticion put porque vamos a actualizar un campo no ingresar pero es indiferencte usar cualquiera
app.put('/uploads/:tipo/:id', function(req, res) {
    let archivo;
    let tipo=req.params.tipo;
    let id=req.params.id;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            err:{
                message:'No se adjunto ningun archivo'
            }
        });
      }

  //validamos los tipos 
  let tiposValidos=['productos','usuarios'];
  if(tiposValidos.indexOf(tipo)<0){
    return res.status(400).json({
        ok:false,
        err:{
            message:'los tipos permitidas son '+ tiposValidos.join(',')
        }
    });
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  archivo = req.files.archivo;

  let extencionesPermitidas=['png','jpg','jpeg','gif'];
  let nombreArchivo=archivo.name.split('.');
  let extension=nombreArchivo[nombreArchivo.length-1];

 
  if(extencionesPermitidas.indexOf(extension)<0){
      return res.status(400).json({
          ok:false,
          err:{
              message:'las extensiones permitidas son'+ extencionesPermitidas.join(',')
          }
      });
  }
  //cambiar el nombre al archivo
  let fileName= `${id}-${new Date().getMilliseconds()}.${extension}`;

  //uploadPath = __dirname + '/uploads/' + archivo.name;

  // Use the mv() method to place the file somewhere on your server
  archivo.mv(`uploads/${tipo}/${fileName}`, function(err) {
    if (err)
      return res.status(500).json({
          ok:false,
          err
      });
      if(tipo ==='usuarios'){

          imagenUsuario(id,res,fileName)
      }
      else{

          imagenProducto(id,res,fileName)
      }
  });

});

function imagenUsuario(id,res,fileName){
    
    Usuario.findById(id,(err,usuarioDB)=>{
        if(err){
            deleteFiles(fileName,'usuarios')
            return res.status(500).json({
                ok:false,
                err
            });
        }
        
    if(!usuarioDB){
        deleteFiles(fileName,'usuarios')
        return res.status(400).json({
            ok:false,
            err:{
                message:'Usuario no existe'
            }
        });
    }
    
    deleteFiles(usuarioDB.img,'usuarios')
    usuarioDB.img=fileName;
    usuarioDB.save((err,usuarioGuardado)=>{
        res.json({
            ok:true,
            usuario:usuarioGuardado,
            img:fileName
        });
    });
    });
}
//borrar archivos  que ya no esten ligado al usuario
function deleteFiles(fileName,tipo){
    let uploadPath=path.resolve(__dirname,`../../uploads/${tipo}/${fileName}`);
    if(fs.existsSync(uploadPath)){
        fs.unlinkSync(uploadPath);
    }
}
function imagenProducto(id,res,fileName){
    Producto.findById(id,(err,productoDB)=>{
        if(err){
            deleteFiles(fileName,'productos')
            return res.status(500).json({
                ok:false,
                err
            });
        }
        
    if(!productoDB){
        deleteFiles(fileName,'productos')
        return res.status(400).json({
            ok:false,
            err:{
                message:'Producto no existe'
            }
        });
    }
    
    deleteFiles(productoDB.img,'productos')
    productoDB.img=fileName;
    productoDB.save((err,productoGuardado)=>{
        res.json({
            ok:true,
            producto:productoGuardado,
            img:fileName
        });
    });
    });
}
module.exports=app;