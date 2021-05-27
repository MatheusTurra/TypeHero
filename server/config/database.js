const path = require("path");

module.exports = {
    dialect: "sqlite",
    storage: path.resolve(__dirname, "..", "database", "typehero.sqlite"),
    define: {
        timestamps: true
    }
}