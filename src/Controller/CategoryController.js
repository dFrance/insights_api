const Category = require('../Models/Category');
const { customAlphabet } = require('nanoid');

class CategoryController {
    index(req, res) {
        Category.find({}).then((category) => {
            return res.json(category)
        })
        .catch((err) => {
            return res.status(200).json({
                error: false,
                message: 'Entrou no get Card'
            })
        })

    }

    async store(req, res) {
        const { title } = req.body;
        const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 6)
        let id = nanoid(6)
        let findDuplicate = await Category.findOne({ title })
        
        if(findDuplicate){
            return res.status(400).json({
                error: true,
                message: "Nome de categoria já cadastrado!"
            })
        }

        const data = {
            title,
            id
        }

        await Category.create(data, (err) => {
            console.log(err)
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "Erro ao cadastrar uma nova categoria!"
                })
            }
        })
        return res.status(200).json({
            error: false,
            message: `Categoria: ${title} cadastrada com sucesso.`
        })
    }
}

module.exports = new CategoryController();