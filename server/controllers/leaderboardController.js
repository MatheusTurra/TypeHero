const Leaderboard = require("../models/Leaderboard");

module.exports = {
    async insertInLeaderboard(req, res) {
        const { name, wordsPerMinute }  = req.body;
        
        const leaderboard = await Leaderboard.create({name, wordsPerMinute});
        
        res.json({leaderboard});
    },

    async showLeaderboard(req, res) {
        const leaderboard = await Leaderboard.findAll();

        res.json({leaderboard});
    },

    async removeFromLeaderboard(req, res) {
        const url = req.params;

        res.json({"valor da url": url})
    }
}