const { Model, DataTypes, Sequelize } = require("sequelize");
const connection = require("../database/index");

/*
Text.init({
    texsat: DataTypes.TEXT,
    allowNull: false
}, {
    sequelize: connection,
    modelName: "Text"
});
*/

const Text = connection.define("Text", {
    text: DataTypes.TEXT,
});



(async () => {
    await connection.sync({ force: true });
    })();

module.exports = Text;