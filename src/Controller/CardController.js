const Card = require('../Models/Card');
const { customAlphabet } = require('nanoid');

class CardController {
    index(req, res) {
        const page = req.query.page;
        const limit = req.query.limit;
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
 
        Card.find({}).then((cards) => {
            const resultQuery = cards.slice(startIndex, endIndex)
            return res.json(resultQuery)
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
            console.log(err)
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