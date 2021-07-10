const breed = require('../models/breed');

function breedSplice(){
return breed.splice(0, 7);
}


module.exports = {
    breedSplice
}