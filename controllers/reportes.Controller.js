const ReporteModel = require('../models/reportes.model');

// Controlador para obtener el reporte de recompensas por año y mes
exports.getReporteRecompensas = async (req, res, next) => {
    try {
        //console.log('Iniciando obtención de datos desde el modelo...');

        // Obtener los datos desde el modelo
        const recompensasPorMes = await ReporteModel.getRecompensasPorMes();

        // Verificar si se obtuvieron datos y convertir a array si es necesario
        const recompensasArray = Array.isArray(recompensasPorMes) ? recompensasPorMes : [];

        //console.log('Datos obtenidos del modelo:', recompensasArray);

        // Enviar los datos a la vista
        res.render('reportes', { 
            pageTitle: 'Reporte de Recompensas por Año y Mes', 
            recompensasPorMes: recompensasArray  // Pasar los datos a la vista
        });
    } catch (error) {
        console.error('Error en el controlador al obtener recompensas:', error);
        res.status(500).send('Error al generar el reporte.');
    }
};
