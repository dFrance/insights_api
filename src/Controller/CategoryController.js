const Category = require('../Models/Category');
const { customAlphabet } = require('nanoid');

class CategoryController {
    index(req, res) {
        Category.find({}).then((category) => {
            return res.json(category)
        })
        .catch((err) => {
            return res.status(400).json({
                error: true,
                message: 'Erro ao acessar o banco de dados.'
            })
        })

    }

    async store(req, res) {
        const { title } = req.body;
        if (title === ''){
            return res.status(400).json({
                error: true,
                message: "Nome da categoria precisa ser definido."
            })
        }
        const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 6)
        let idCategory = nanoid(6)
        let findDuplicate = await Category.findOne({ title })
        if(findDuplicate){
            return res.status(400).json({
                error: true,
                message: "Nome de categoria já cadastrado!"
            })
        }

        const data = {
            title,
            idCategory
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