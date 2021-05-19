const textController = require("./controllers/textController");
const leaderboardsController = require("./controllers/leaderboardController");

module.exports = (app) => {
    app.get("/text", textController.getAllTexts);
    app.post("/text", textController.create);

    app.get("/leaderboards", leaderboardsController.showLeaderboard);
    app.post("/leaderboards", leaderboardsController.insertInLeaderboard);
}