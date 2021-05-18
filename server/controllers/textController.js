const Text = require("../models/Text");

module.exports = {
    async create(req, res) {
        const { textValue } = req.body;

        const text = Text.build({"text": textValue});

        await text.save()
        
        return res.json(text)
    }
}