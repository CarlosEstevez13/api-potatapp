'use strict'
var con = require('../connection')

function getActividad(req,res)
{
    let activiId= req.params.id;
    if(con){
        con.query(`SELECT * FROM actividad WHERE id_activi = '${activiId}'`, function (err, result) {
        if (err){
             res.status(500).send({message:'Error al devolver la actividad'});
        } else{
            if(!result[0]){
                    res.status(404).send({message:'No existe la actividad'});   
             }else{
                    res.status(200).send({result});               
             }
        }
            
     });}
}
function getIdActividad(req,res)
{
    let activiId= req.params.id;
    if(con){
        con.query(`SELECT MAX(id_activi) as maximo FROM actividad`, function (err, result) {
        if (err){
             res.status(500).send({message:'Error al devolver la actividad'});
        } else{
            if(!result[0]){
                    res.status(404).send({message:'No existe la actividad'});   
             }else{
                    res.status(200).send({result});               
             }
        }
            
     });}
}

function getActividades(req,res)
{
    let id_finca= req.params.id;
    if(con){
    con.query(`SELECT * FROM actividad WHERE id_finca = '${id_finca}' AND estado_activi = '1' `, function (err, result) {
    if (err){
        res.status(500).send({message:'Error al devolver las actividades'});
    } else{
        if(!result[0]){
             res.status(404).send({message:'No hay actividades'});   
        }else{
            res.status(200).send({result});               
        }
    }
            
    });}

}

function getActividadesInactivas(req,res)
{
    let id_finca= req.params.id;
    if(con){
    con.query(`SELECT * FROM actividad WHERE id_finca = '${id_finca}' AND estado_activi = '0' `, function (err, result) {
    if (err){
        res.status(500).send({message:'Error al devolver las actividades'});
    } else{
        if(!result[0]){
             res.status(404).send({message:'No hay actividades'});   
        }else{
            res.status(200).send({result});               
        }
    }
            
    });}

}

function saveActividad(req,res)
{
    if(con){
    var params = req.body;

    con.query(`INSERT INTO actividad (nombre_activi, descripcion_activi, id_finca, estado_activi, fecha_activi, num_jornales) VALUES ('${params.nombre_activi}',
                '${params.descripcion_activi}',  '${params.id_finca}','${params.estado_activi}','${params.fecha_activi}', '${params.num_jornales}')`, function (err, result) {
        if (err){
           res.status(500).send({message:'Error al guardar', yaExiste:true});
           
        } 
        else{
            res.status(200).send({message:'actividad agregada'});           
        }
       
    });}
 }

 function updateActividad(req,res)
{
    if(con){
    var actividadId= req.params.id;
    var update = req.body;
    const sql ='UPDATE actividad SET  id_activi = '+ con.escape(update.id_activi) +
                ', nombre_activi = '+ con.escape(update.nombre_activi) +
                ', descripcion_activi = '+ con.escape(update.descripcion_activi) +
                ', id_finca = '+ con.escape(update.id_finca) +
                ', estado_activi = '+ con.escape(update.estado_activi) +
                ', fecha_activi = '+ con.escape(update.fecha_activi) +
                ', num_jornales = '+ con.escape(update.num_jornales) +
                ' WHERE id_activi = '+actividadId;
    con.query(sql, function (err, result) {
        if (err){
           res.status(500).send({message:'Error al guardar'});
        } 
        else{
            
                res.status(200).send({message:'Actividad modificada'});           
        }
       
    });}
}

function deleteActividad(req,res)
{   
    if(con){
    let activiId= req.params.id;
    
    con.query(`SELECT * FROM actividad WHERE id_activi = '${activiId}'`, function (err, result) {
        if (err){
             res.status(500).send({message:'Error al buscar la actividad'});
        } else{
            if(!result[0]){
                    res.status(404).send({message:'No existe la actividad'});   
             }else{
                con.query(`DELETE FROM actividad WHERE id_activi = '${activiId}'`, function (err, result) {
                if (err){
                    res.status(500).send({message:'Error al eliminar'});
                } 
                else{
                    res.status(200).send({message:'se elimino la actividad'});               
                }
                    
                 });               
             }
        }
            
     });}
           
}


module.exports={
    getActividad,
    getActividades,
    getActividadesInactivas,
    saveActividad,
    updateActividad,
    deleteActividad,
    getIdActividad
}