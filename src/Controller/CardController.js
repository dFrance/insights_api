const Card = require('../Models/Card');
const { customAlphabet } = require('nanoid');

class CardController {
    index(req, res) {
        Card.find({}).then((cards) => {
            return res.json(cards)
        })
        .catch((err) => {
            return res.status(200).json({
                error: false,
                message: 'Entrou no get Card'
            })
        })

    }

    async store(req, res) {
        const { title, category } = req.body;
        const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 6)
        let id = nanoid(6)
        let findDuplicate = await Card.findOne({ id })
        
        if(findDuplicate){
            id = nanoid(6)
        }

        const data = {
            title,
            category: category,
            id: id
        }


        Card.create(data, (err) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "Erro ao cadastrar um novo insight!"
                })
            }
            return res.status(200).json({
                error: false,
                message: `Insight: ${title} cadastrado com sucesso.`
            })
        })
    }
}

module.exports = new CardController();