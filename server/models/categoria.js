const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema=mongoose.Schema;

let categoriaSchema=new Schema({
    descripcion:{type:String,unique:true,required:[true,'La descripcion es obligatoria']},
    usuario:{type:Schema.Types.ObjectId,ref:'Usuario'}
});

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser única' });


module.exports=mongoose.model('Categoria',categoriaSchema);