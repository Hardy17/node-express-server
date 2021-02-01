
const express= require('express');
const _ = require('underscore');
const  Categoria= require('../models/categoria');
const {verificaToken,verificaAdminRole}=require('../middlewares/autenticacion');


const app=express();


app.get('/categoria',verificaToken,(req,res)=>{

   Categoria.find({})
   .sort('descripcion')
   .populate('usuario','nombre,email')
   .exec((err,categorias)=>{
      
    if(err){
        return res.status(400).json({
            ok:false,
            err
        });
    }
    res.json({
        ok:true,
        categorias
    })

   });

});

app.get('/categoria/:id',verificaToken,(req,res)=>{
    let id= req.params.id;
    Categoria.findById(id,(err,categoria)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok:true,
            categoria
        });
    });
});

app.post('/categoria',[verificaToken,verificaAdminRole],(req,res)=>{

   let body=req.body;
   
   let categoria= new Categoria({
       descripcion:body.descripcion,
       usuario:req.usuario._id
   });
   
   categoria.save((err,cantegoriaDB)=>{
       if(err){
           return res.status(400).json({
               ok:false,
               err
           });
       }
       
       res.json({
           ok:true,
           categoria:cantegoriaDB,
       })
   });

});

app.put("/categoria/:id",[verificaToken,verificaAdminRole],function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ["descripcion"]);
  
    Categoria.findByIdAndUpdate(id, body, { new: true,runValidators:true, context: 'query' }, (err, categoriaDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        categoria: categoriaDB,
      });
    });
  });

  app.delete("/categoria/:id",[verificaToken,verificaAdminRole],(req,res)=>{
       //Borrado fisico de la BD
  let id =req.params.id;
  Categoria.findByIdAndRemove(id,(err,categoriaBorrada)=>{

    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!categoriaBorrada){
      return res.status(400).json({
        ok:false,
        err:{
          message:'id no existe'
        }
      })
    }
    res.json({
      ok:true,
      message:'Categoria Borrada'
    })
  })
  });

module.exports=app;