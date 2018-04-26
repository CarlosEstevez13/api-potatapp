'use strict'

var express =require('express');

var ActividadController = require('../controller/actividad');
var EmpleadoController = require('../controller/empleado');
var FincaController = require('../controller/finca');
var HistorialController = require('../controller/historial');
var LiquidarController = require('../controller/liquidar');
var api = express.Router();

api.get('/actividad/:id?',ActividadController.getActividad);
api.get('/actividades/:id?',ActividadController.getActividades);
api.get('/actividadesinactivas/:id?',ActividadController.getActividadesInactivas);
api.post('/actividad',ActividadController.saveActividad);
api.put('/actividad/:id',ActividadController.updateActividad);
api.delete('/actividad/:id',ActividadController.deleteActividad);
api.get('/idactividad',ActividadController.getIdActividad);

api.get('/empleado/:id?',EmpleadoController.getEmpleado);
api.get('/empleadosactivos',EmpleadoController.getEmpleadosActivos);
api.get('/empleados',EmpleadoController.getEmpleados);
api.post('/empleado',EmpleadoController.saveEmpleado);
api.put('/empleado/:id',EmpleadoController.updateEmpleado);

api.get('/finca/:id?',FincaController.getFinca);
api.get('/fincas',FincaController.getFincas);
api.post('/finca',FincaController.saveFinca);
api.put('/finca/:id',FincaController.updateFinca);

api.get('/historialFinca/:id?',HistorialController.getHistorialFinca);
api.get('/historial',HistorialController.getHistorial); /* por fecha */
api.get('/historialporfinca',HistorialController.getHistorialPorFinca); /* por finca */
api.post('/historial',HistorialController.saveHistorial); 
api.put('/historial',HistorialController.updateHistorial);

api.get('/liquidar/:id?',LiquidarController.getLiquidar);
api.put('/liquidar',LiquidarController.updateLiquidar);

module.exports = api;