const Card = require('../Models/Card');
const { Readable } = require('stream')
const readline = require('readline')
const { customAlphabet } = require('nanoid');
const Category = require('../Models/Category');

class ImportController {
    async store(req, res) {
        const { buffer } = req.file;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const productLine = readline.createInterface({
            input: readableFile
        })

        let dataOfRegister = {}
        // Começa o tratamento linha a linha
        for await (let line of productLine) {
            const productLineSplit = line.split(",")
            let id = ''
            let idCategory = ''

            // Criação do ID Card
            const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 6)
            id = nanoid(6)
            let findDuplicate = await Card.findOne({ id })
            if (findDuplicate) {
                id = nanoid(6)
            }

            //Começa o tratamento da linha caso tenha mais de uma categoria
            if (productLineSplit[1].includes(';')) {
                let categories = null
                let alreadyRegisterTheCategory = undefined

                const categorySplit = productLineSplit[1].split(";")
                productLineSplit[1] = categorySplit

                //Constroi o formato de categorias
                for await (let category of productLineSplit[1]) {
                    alreadyRegisterTheCategory = await Category.findOne({ title: category })
                    if (alreadyRegisterTheCategory !== null) {
                        if (categories === null) {
                            categories = { 'title': category, 'idCategory': alreadyRegisterTheCategory.idCategory }
                        } else {
                            categories = [{ ...categories }, { 'title': category, 'idCategory': alreadyRegisterTheCategory.idCategory }]
                        }
                    }
                }
                // Construção do Data para ser adicionado ao banco
                dataOfRegister = {
                    "title": productLineSplit[0],
                    "category": [...categories],
                    "id": id
                }
            } else {
                //Começa o tratamento de linha caso tenha uma categoria
                const alreadyRegisterTheCategory = await Category.findOne({ title: productLineSplit[1] })
                if (!alreadyRegisterTheCategory) {
                    const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 6)
                    idCategory = nanoid(6)
                    let findDuplicate = await Card.findOne({ id: idCategory })
                    if (findDuplicate) {
                        idCategory = nanoid(6)
                    }
                } else {
                    idCategory = alreadyRegisterTheCategory.idCategory
                }

                dataOfRegister = {
                    "title": productLineSplit[0],
                    "category": [{ "idCategory": idCategory, "title": productLineSplit[1] }],
                    "id": id
                }

            }

            Card.create(dataOfRegister, (err) => {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "Erro ao cadastrar um novo insight!"
                    })
                }
            })
        }
        return res.status(200).json({
            error: false,
            message: `Insight upados via CSV.`
        })
    }
}

module.exports = new ImportController();