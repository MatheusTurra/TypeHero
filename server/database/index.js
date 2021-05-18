const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");
const text = require("../models/Text");

const connection = new Sequelize(dbConfig);

module.exports = connection;