const express = require("express");
const router = require("../routes");
const cors = require("cors");

module.exports = () => {
    const app = express();

    app.set("port", 3333);
    
    app.use(express.json());
    app.use(cors());

    router(app);

    return app;
}