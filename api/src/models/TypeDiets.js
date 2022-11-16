const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// la receta que es de dieta 
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diets', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      dietType: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  };