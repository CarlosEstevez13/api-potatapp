'use strict'
var con = require('../connection')

function getEmpleado(req,res)
{
    let empleadoId= req.params.id;
    if(con){
        con.query(`SELECT * FROM empleado WHERE id_empleado = '${empleadoId}'`, function (err, result) {
        if (err){
             res.status(500).send({message:'Error al devolver el empleado'});
        } else{
            if(!result[0]){
                    res.status(404).send({message:'No existe el empleado'});   
             }else{
                    res.status(200).send({result});               
             }
        }
            
     });}
}

function getEmpleados(req,res)
{
    if(con){
    con.query(`SELECT * FROM empleado WHERE estado_emple = 0`, function (err, result) {
    if (err){
        res.status(500).send({message:'Error al devolver los empleados'});
    } else{
        if(!result[0]){
             res.status(404).send({message:'No hay empleados'});   
        }else{
            res.status(200).send({result});               
        }
    }
            
    });}

}

function getEmpleadosActivos(req,res)
{
    if(con){
    con.query(`SELECT * FROM empleado WHERE estado_emple = '1'`, function (err, result) {
    if (err){
        res.status(500).send({message:'Error al devolver los empleados'});
    } else{
        if(!result[0]){
             res.status(404).send({message:'No hay empleados'});   
        }else{
            res.status(200).send({result});               
        }
    }
            
    });}

}


function saveEmpleado(req,res)
{
    if(con){
    var params = req.body;

    con.query(`INSERT INTO empleado (nombre_emple, apellidos_emple, cedula_emple, nacimiento_emple, estado_emple, eps_emple, valor_jornal) VALUES ('
            ${params.nombre_emple}','${params.apellidos_emple}','${params.cedula_emple}','${params.nacimiento_emple}','${params.estado_emple}','${params.eps_emple}','${params.valor_jornal}')`, function (err, result) {
        if (err){
            console.log(err);
           res.status(500).send({message:'Error al guardar', yaExiste:true});
           
        } 
        else{
            res.status(200).send({message:'empleado agregado'});           
        }
       
    });}
 }

 function updateEmpleado(req,res)
{
    if(con){
    var empleadoId= req.params.id;
    var update = req.body;
    const sql ='UPDATE empleado SET  id_empleado = '+ con.escape(update.id_empleado) +
                ', nombre_emple = '+ con.escape(update.nombre_emple) +
                ', apellidos_emple = '+ con.escape(update.apellidos_emple) +
                ', nacimiento_emple = '+ con.escape(update.nacimiento_emple) +
                ', estado_emple = '+ con.escape(update.estado_emple) +
                ', eps_emple = '+ con.escape(update.eps_emple) +
                ', valor_jornal = '+ con.escape(update.valor_jornal) +
                ' WHERE id_empleado = '+empleadoId;
    con.query(sql, function (err, result) {
        if (err){
            console.log(err);
           res.status(500).send({message:'Error al guardar'});
        } 
        else{
            
                res.status(200).send({message:'Empleado modificado'});           
        }
       
    });}
}




module.exports={
    getEmpleado,
    getEmpleados,
    getEmpleadosActivos, 
    saveEmpleado,
    updateEmpleado
}