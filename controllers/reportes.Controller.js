const ReporteModel = require('../models/reportes.model');

exports.getReporteSellos = async (req, res, next) => {
    try {
        const sellosPorEmpleado = await ReporteModel.getSellosPorEmpleado();
        const sellosArray = Array.isArray(sellosPorEmpleado) ? sellosPorEmpleado : [];
        const reclamaciones = await ReporteModel.reclamacion();
        //console.log(reclamaciones);
        res.render('reportes', { 
            pageTitle: 'Reporte de Sellos por Empleado', 
            sellosPorEmpleado: sellosArray,
            reclamaciones: reclamaciones
        });
    } catch (error) {
        console.error('Error en el controlador al obtener sellos:', error);
        res.status(500).send('Error interno en el servidor');
    }
};
