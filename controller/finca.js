'use strict'
var con = require('../connection')

function getFinca(req,res)
{
    let fincaId= req.params.id;
    if(con){
        con.query(`SELECT * FROM finca WHERE id_finca = '${fincaId}'`, function (err, result) {
        if (err){
             res.status(500).send({message:'Error al devolver la finca'});
        } else{
            if(!result[0]){
                    res.status(404).send({message:'No existe la finca'});   
             }else{
                    res.status(200).send({result});               
             }
        }
            
     });}
}

function getFincas(req,res)
{
    if(con){
    con.query(`SELECT * FROM finca`, function (err, result) {
    if (err){
        res.status(500).send({message:'Error al devolver las fincas'});
    } else{
        if(!result[0]){
             res.status(404).send({message:'No hay fincas'});   
        }else{
            res.status(200).send({result});               
        }
    }
            
    });}

}

function saveFinca(req,res)
{
    if(con){
    var params = req.body;

    con.query(`INSERT INTO finca (nombre_finca, ubicacion_finca, descripcion_finca, trabajador_encargado) VALUES ('
            ${params.nombre_finca}','${params.ubicacion_finca}','${params.descripcion_finca}','${params.trabajador_encargado}')`, function (err, result) {
        if (err){
            console.log(err);
           res.status(500).send({message:'Error al guardar', yaExiste:true});
           
        } 
        else{
            res.status(200).send({message:'Finca agregada'});           
        }
       
    });}
 }

 function updateFinca(req,res)
{
    if(con){
    var fincaId= req.params.id;
    var update = req.body;
    const sql ='UPDATE finca SET  id_finca = '+ con.escape(update.id_finca) +
                ', nombre_finca = '+ con.escape(update.nombre_finca) +
                ', ubicacion_finca = '+ con.escape(update.ubicacion_finca) +
                ', descripcion_finca = '+ con.escape(update.descripcion_finca) +
                ', trabajador_encargado = '+ con.escape(update.trabajador_encargado) +
                ' WHERE id_finca = '+fincaId;
    con.query(sql, function (err, result) {
        if (err){
           res.status(500).send({message:'Error al guardar'});
        } 
        else{
            
                res.status(200).send({message:'Finca modificada'});           
        }
       
    });}
}




module.exports={
    getFinca,
    getFincas, 
    saveFinca,
    updateFinca
}