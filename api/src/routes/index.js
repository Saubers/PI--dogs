const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoutes = require('./dogs');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogsRoutes)
router.use('/dogs', dogsRoutes);
router.use('/temperament', dogsRoutes)

module.exports = router;
