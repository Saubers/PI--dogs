require('dotenv').config();
const dogTemp = require('./models/temp')
const dogBreed = require('./models/breed')
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,
} = process.env;


const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialect: 'postgres',
  port: DB_PORT 
});

const temperament = dogTemp(db)
const breed = dogBreed(db)

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(db));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(db.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
db.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

breed.belongsToMany(temperament, { through: "breed_temperament" });
temperament.belongsToMany(breed, { through: "breed_temperament" })


module.exports = { // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: db,     // para importart la conexión { conn } = require('./db.js');
  temperament,
  breed
};
