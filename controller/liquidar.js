'use strict'
var con = require('../connection')

function getLiquidar(req,res)
{
    let fincaId= req.params.id;
    if(con){
        con.query(`SELECT num_jornales,finca.id_finca,descripcion_activi,fecha_activi,historial.id_activi,nombre_activi,nombre_emple, nombre_finca, 
                    (valor_jornal * num_jornales) AS 'valor_activi' 
                    FROM historial 
                    INNER JOIN actividad ON historial.id_activi = actividad.id_activi 
                    INNER JOIN empleado ON historial.id_empleado = empleado.id_empleado 
                    INNER JOIN finca ON historial.id_finca = finca.id_finca 
                    WHERE historial.id_finca = '${fincaId}' 
                    AND estado_activi = '1'
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

function updateLiquidar(req,res)
{
    if(con){
    var fincaId= req.params.id;
    var update1 = req.body;
    console.log(update1[0]);
    for (let i=0; i<update1.length; i++)
    {
        let update = update1[i];
        const sql ='UPDATE actividad SET  id_activi = '+ con.escape(update.id_activi) +
                ', nombre_activi = '+ con.escape(update.nombre_activi) +
                ', descripcion_activi = '+ con.escape(update.descripcion_activi) +
                ', id_finca = '+ con.escape(update.id_finca) +
                ', estado_activi = '+ ' 0 ' +
                ', fecha_activi = '+ con.escape(update.fecha_activi) +
                ', num_jornales = '+ con.escape(update.num_jornales) +
                ' WHERE id_activi = '+ con.escape(update.id_activi);
    con.query(sql, function (err, result) {
        if (err){
            console.log(err);
           res.status(500).send({message:'Error al guardar'});
        } 
        else{
            
                res.status(200).send({message:'Actividad modificada'});           
        }
       
    });
    }

    
    }
}




module.exports={
    getLiquidar,
    updateLiquidar
}