

const express= require('express');
const _ = require('underscore');
const  Producto= require('../models/producto');
const {verificaToken}=require('../middlewares/autenticacion');
const producto = require('../models/producto');

const app=express();

app.get('/producto',verificaToken,(req,res)=>{
    let desde = Number(req.query.desde) || 0;
    let limite =Number(req.query.limite)|| 5;

    Producto.find({disponible:true})
    .sort('nombre')
    .populate('usuario','nombre')
    .populate('categoria','descripcion')
    .skip(desde)
    .limit(limite)
    .exec((err,producto)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        Producto.countDocuments({disponible:true},(err,conteo)=>{
            res.json({
                ok:true,
                producto,
                existencia:conteo
            });
        });

    });

});

app.get('/producto/:id',verificaToken,(req,res)=>{
    
    let id=req.params.id;
    Producto.findById(id)
    .populate('usuario','nombre')
    .populate('categoria','descripcion')
    .exec((err,producto)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err:{
                    message:'Producto no encontrado'
                }
            });
        }
        if(!producto){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Id de producto no valido'
                }
            })
        }
        res.json({
            ok:true,
            producto
        });
    })
    
});

app.get('/producto/buscar/:termino',verificaToken,(req,res)=>{

    let termino= req.params.termino;
    let regex= new RegExp(termino,'i');
    Producto.find({nombre:regex,disponible:true})
    .populate('categoria','descripcion')
    .exec((err,producto)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            producto
        })

    });
});
    

app.post('/producto',verificaToken,(req,res)=>{

    let body=req.body;

    let producto=new Producto({
        nombre:body.nombre,
        precioUni:body.precioUni,
        descripcion:body.descripcion,
        categoria:body.categoria,
        usuario:req.usuario._id
    });

    producto.save((err,producto)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            producto
        });
    });

});

app.put('/producto/:id',verificaToken,(req,res)=>{

    let id= req.params.id;
    let body=_.pick(req.body,['nombre','precioUni','descripcion','categoria','disponible']);

    Producto.findByIdAndUpdate(id,body,{new:true,runValidators:true,context:'query'})
    .populate('usuario','nombre')
    .populate('categoria','descripcion')
    .exec((err,producto)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            producto
        });
    });

});

app.delete('/producto/:id',verificaToken,(req,res)=>{
    
    let id= req.params.id;
    let disponible={
        disponible:false
    }
    Producto.findByIdAndUpdate(id,disponible,{new:true},(err,producto)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!producto){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Producto no encontrado'
                }
            });
        }
        res.json({
            ok:true,
            message:'Producto desabilitado'
        })
    });

});
module.exports=app;