const { DataTypes } = require("sequelize") 
const connection = require("../database/index");

const Leaderboard = connection.define("Leaderboard", {
    name: DataTypes.STRING,
    wordsPerMinute: DataTypes.INTEGER
});

(async () => {
    await connection.sync();
    })();

module.exports = Leaderboard;