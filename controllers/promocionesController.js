// Controlador para obtener todas las promociones

exports.getAllPromociones = async (req, res, next) => {
    try {
        const Promociones = await DuperModel.getAllPromociones(); // Cambia el nombre a la función correcta
        console.log(Promociones); // Debug para verificar los datos recibidos

        const PromocionesArray = Array.isArray(Promociones) ? Promociones : [Promociones];

        res.render('promocion', { promociones: PromocionesArray });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar la página de promociones');
    }
};

// Controlador para registrar una nueva promoción
exports.registrarPromocion = async (req, res, next) => {
    try {
        const { nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;
        await DuperModel.registrarPromocion(nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo);
        res.redirect('/promociones');  // Redirigir a la página de promociones después de registrar
    } catch (error) {
        console.error('Error al registrar la promoción:', error);
        res.status(500).send('Error al registrar la promoción');
    }
};


// Controlador para editar una promoción existente
exports.editarPromocion = async (req, res, next) => {
    try {
        const { idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo } = req.body;
        await DuperModel.editarPromocion(idRecompensa, nombreRecompensa, fechaInicio, fechaFinal, descripcionRegalo); // Editar promoción
        res.redirect('/promociones'); // Redirigir a la página de promociones
    } catch (err) {
        console.error('Error al editar la promoción:', err);
        res.status(500).send('Error al editar la promoción');
    }
};

// Controlador para eliminar una promoción
exports.eliminarPromocion = async (req, res, next) => {
    try {
        const { ID_Recompensa } = req.body; // Obtener el ID de la recompensa a eliminar
        await DuperModel.eliminarPromocion(ID_Recompensa); // Eliminar la promoción
        res.redirect('/promociones'); // Redirigir a la página de promociones
    } catch (err) {
        console.error('Error al eliminar la promoción:', err);
        res.status(500).send('Error al eliminar la promoción');
    }
};