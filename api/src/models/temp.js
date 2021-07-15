const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (db) => {
  // defino el modelo
return db.define('dog', {
    name: { type: DataTypes.STRING, allowNull: false },
  });
};