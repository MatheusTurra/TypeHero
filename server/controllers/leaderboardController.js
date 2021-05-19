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

        const removed = await Leaderboard.destroy({
            where: {
                id: url.id
            }
        })

        res.json({"valor da url": removed})
    },

    async updateFromLeaderboard(req, res) {
        const url = req.params;
        const newName = req.body.name;

        const updatedName = Leaderboard.update({name: newName}, {
            where: {
                id: url.id
            }
        });

        res.json({});
    }
}