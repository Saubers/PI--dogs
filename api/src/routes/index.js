const express = require('express');
const dogsRoutes = require('./dogs');

const { Router } = require('express');
const { API_KEY } = process.env;
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use("/dogs", dogsRoutes);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
