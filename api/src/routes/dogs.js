const { breeds } = require('../models/breed');
const temp = require('../models/temp')
const router = require('express').Router();
const { dogBreed } = require('./functions');

router.get('/dogs', function (_req, res, next) {
  dogBreed.findAll()
.then(breeds => res.json(breeds))
.catch(error => next(error))
});

router.get('/dogs?name="..":', (req, res) => {
    
});

router.get('/dogs/{id}:', (req, res) => {
    
});

router.get('/temperament:', (req, res) => {
    
});

router.post('/dog', (req, res) => {
    
});

module.exports = router;