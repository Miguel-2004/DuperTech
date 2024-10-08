const ReporteModel = require('../models/reportes.model');

// Controlador para obtener el reporte de sellos por empleado
exports.getReporteSellos = async (req, res, next) => {
    try {
        const sellosPorEmpleado = await ReporteModel.getSellosPorEmpleado();
        const sellosArray = Array.isArray(sellosPorEmpleado) ? sellosPorEmpleado : [];
        res.render('reportes', { 
            pageTitle: 'Reporte de Sellos por Empleado', 
            sellosPorEmpleado: sellosArray
        });
    } catch (error) {
        console.error('Error en el controlador al obtener sellos:', error);
        res.status(500).send('Error interno en el servidor');
    }
};
