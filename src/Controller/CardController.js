const Card = require('../Models/Card');
const { customAlphabet } = require('nanoid');
const Category = require('../Models/Category');

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
                return res.status(400).json({
                    error: true,
                    message: 'Erro ao acessar o banco de dados.'
                })
            })

    }

    async store(req, res) {
        const { title, category } = req.body;
        if (!title) {
            return res.status(400).json({
                error: true,
                message: "Nome do insight obrigatório"
            })
        }

        const cardFind = await Card.findOne({ title: title })
        if (cardFind) {
            return res.status(400).json({
                error: true,
                message: "Insight já cadastrado."
            })
        }

        if (category) {
            const findCategoryTitle = await category.map((category) => {
                return category.title
            })
            const findCategoryId = await category.map((category) => {
                return category.idCategory
            })
            const findCategory = await Category.find({ title: findCategoryTitle })
            const findId = await Category.find({ idCategory: findCategoryId })
            if (findCategory.length !== category.length || findId.length !== category.length) {
                return res.status(400).json({
                    erro: true,
                    message: "Uma das categorias não existe."
                })
            }
        }

        const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 6)
        let id = nanoid(6)
        let findDuplicate = await Card.findOne({ id })

        if (findDuplicate) {
            id = nanoid(6)
        }

        const data = {
            title,
            category: category,
            id: id
        }


        Card.create(data, (err) => {
            if (err) {
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