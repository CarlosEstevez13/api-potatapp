'use strict'
var con = require('../connection')

function getHistorialFinca(req,res)
{
    let fincaId= req.params.id;
    if(con){
        con.query(`SELECT fecha_activi,nombre_activi,nombre_emple, nombre_finca, 
                    (valor_jornal * num_jornales) AS 'valor_activi' 
                    FROM historial 
                    INNER JOIN actividad ON historial.id_activi = actividad.id_activi 
                    INNER JOIN empleado ON historial.id_empleado = empleado.id_empleado 
                    INNER JOIN finca ON historial.id_finca = finca.id_finca 
                    WHERE historial.id_finca = '${fincaId}'  
                    ORDER BY fecha_activi;
        `, function (err, result) {
        if (err){
             res.status(500).send({message:'Error al devolver el historial'});
        } else{
            if(!result[0]){
                    res.status(404).send({message:'No existe un historial'});   
             }else{
                    res.status(200).send({result});               
             }
        }
            
     });}
}

function getHistorial(req,res)
        /* todo el historial por fecha */
{
    if(con){
    con.query(`SELECT fecha_activi,nombre_activi,nombre_emple, nombre_finca, 
                (valor_jornal * num_jornales) AS 'valor_activi' 
                FROM historial INNER JOIN actividad ON historial.id_activi = actividad.id_activi 
                INNER JOIN empleado ON historial.id_empleado = empleado.id_empleado 
                INNER JOIN finca ON historial.id_finca = finca.id_finca 
                ORDER BY fecha_activi;
    `, function (err, result) {
    if (err){
        console.log(err);
        res.status(500).send({message:'Error al devolver el historial'});
    } else{
        if(!result[0]){
             res.status(404).send({message:'No un historial'});   
        }else{
            res.status(200).send({result});               
        }
    }
            
    });}

}


function getHistorialPorFinca(req,res)
        /* todo el historial por finca */
{
    if(con){
    con.query(`SELECT fecha_activi,nombre_activi,nombre_emple, nombre_finca, 
                (valor_jornal * num_jornales) AS 'valor_activi' 
                FROM historial INNER JOIN actividad ON historial.id_activi = actividad.id_activi 
                INNER JOIN empleado ON historial.id_empleado = empleado.id_empleado 
                INNER JOIN finca ON historial.id_finca = finca.id_finca 
                ORDER BY nombre_finca;
    `, function (err, result) {
    if (err){
        console.log(err);
        res.status(500).send({message:'Error al devolver el historial'});
    } else{
        if(!result[0]){
             res.status(404).send({message:'No un historial'});   
        }else{
            res.status(200).send({result});               
        }
    }
            
    });}

}

function saveHistorial(req,res)
{
    if(con){
    var params = req.body;

    con.query(`INSERT INTO historial (id_activi, id_finca, id_empleado) VALUES (
            '${params.id_activi}','${params.id_finca}','${params.id_empleado}')`, function (err, result) {
        if (err){
            console.log(err);
           res.status(500).send({message:'Error al guardar, el registro ya existe', yaExiste:true});
           
        } 
        else{
            res.status(200).send({message:'Registro agregado'});           
        }
       
    });}
 }

 function updateHistorial(req,res)
{
    if(con){
    var fincaId= req.params.id;
    var update = req.body;
    const sql ='UPDATE historial SET id_activi = '+ con.escape(update.id_activi) +
                ', id_finca = '+ con.escape(update.id_finca) +
                ', id_empleado = '+ con.escape(update.id_empleado) +
                ' WHERE id_activi = '+update.id_activi + ' AND id_finca = ' + update.id_finca  + ' AND id_empleado = ' + update.id_empleado;
    con.query(sql, function (err, result) {
        if (err){
            console.log(err);
           res.status(500).send({message:'Error al guardar'});
        } 
        else{
            
                res.status(200).send({message:'Registro modificada'});           
        }
       
    });}
}




module.exports={
    getHistorialFinca,
    getHistorial, 
    getHistorialPorFinca,
    saveHistorial,
    updateHistorial
}