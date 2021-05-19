const Text = require("../models/Text");

module.exports = {

    async getAllTexts(req, res) {
        const allTexts = await Text.findAll();

        return res.json(allTexts);
    },

    async create(req, res) {
        const { textValue } = req.body;

        const text = Text.build({"text": textValue});

        await text.save();
        
        return res.json(text);
    }
}