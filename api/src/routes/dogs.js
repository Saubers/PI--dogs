const { breeds } = require('../models/breed');
const dog = require('../models/Dog');
const temp = require('../models/temp');
const router = require('express').Router();
const fetch = require('node-fetch');
const breedSplice = require('./functions')

const API = fetch("https://api.thedogapi.com/v1/breeds")
.then(promesaFetch => promesaFetch.json())
.then(contenido => contenido)


router.get('/', (_req, res) => {
  res.json(API)
  .catch(error => next(error))
})

router.get(`/dogs`, function (req, res, next) {
  res.findByPk()
  .then(datos => res.json(datos))
  .catch(error => next(error))

});

router.get('/dogs?name=:', (req, res, next) => {
  res.json(req.query.name)
});

router.get('/dogs/{id}:', (req, res) => {
    
});

router.get('/temperament:', (req, res) => {
    
});

router.post('/dog', (req, res) => {
    
});

module.exports = router;