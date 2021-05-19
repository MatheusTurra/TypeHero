const Text = require("../models/Text");

module.exports = {

    async getAllTexts(req, res) {
        const allTexts = await Text.findAll();

        return res.json(allTexts);
    },

    async createText(req, res) {
        const { textValue } = req.body;

        const text = Text.build({"text": textValue});

        await text.save();
        
        return res.json(text);
    },

    async deleteText(req, res) {
        const urlParam = req.params;

        const removedText = Text.destroy({
            where: {
                "id": urlParam.id
            }
        });

        res.json({removedText});
    },

    async updateText(req, res) {
        const urlParam = req.params;
        const newText = req.body.text;

        const updatedText = Text.update({text: newText}, {
            where: {
                "id": urlParam.id
            }
        })

        res.json({updatedText});
    }
}