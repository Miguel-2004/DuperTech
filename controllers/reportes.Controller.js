const ReporteModel = require('../models/reportes.model');

exports.getReporteSellos = async (req, res, next) => {
    try {
        const sellosPorEmpleado = await ReporteModel.getSellosPorEmpleado();
        const reclamaciones = await ReporteModel.reclamacion();
        const tarjetasPorSucursal = await ReporteModel.getTarjetasPorSucursal();
        const sellosPorSucursal = await ReporteModel.getSellosPorSucursal();

        res.render('reportes', { 
            pageTitle: 'Reporte de Sellos por Empleado', 
            sellosPorEmpleado: sellosPorEmpleado || [],
            reclamaciones: reclamaciones || [],
            tarjetasPorSucursal: tarjetasPorSucursal || [],
            sellosPorSucursal: sellosPorSucursal || [],
        });
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).send('Error interno en el servidor');
    }
};

exports.getReporteTarjetasPorSucursal = async (req, res, next) => {
    try {
        const tarjetasPorSucursal = await ReporteModel.getTarjetasPorSucursal();
        const tarjetasArray = Array.isArray(tarjetasPorSucursal) ? tarjetasPorSucursal : [];
        res.render('reportes', { 
            pageTitle: 'Reporte de Tarjetas por Sucursal', 
            tarjetasPorSucursal: tarjetasArray
        });
    } catch (error) {
        console.error('Error en el controlador al obtener tarjetas por sucursal:', error);
        res.status(500).send('Error interno en el servidor');
    }
};

