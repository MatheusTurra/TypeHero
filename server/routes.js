const textController = require("./controllers/textController");

module.exports = (app) => {
    app.post("/text", textController.create);
}