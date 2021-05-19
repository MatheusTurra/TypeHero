const { DataTypes } = require("sequelize");
const connection = require("../database/index");

const Text = connection.define("Text", {
    text: DataTypes.TEXT,
});


(async () => {
    await connection.sync();
    })();
 
module.exports = Text;