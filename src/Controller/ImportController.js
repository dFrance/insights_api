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
        for await (let line of productLine) {
            const productLineSplit = line.split(",")
            if (productLineSplit[1].includes(';')) {
                const categorySplit = productLineSplit[1].split(";")
                productLineSplit[1] = categorySplit
            }

            for await (let category of productLineSplit[1]){
                const alrearyRegisteTheCategory = await Category.find({ title: category })
                console.log(alrearyRegisteTheCategory)
                if(alrearyRegisteTheCategory){
                    console.log({'title': category, 'id': alrearyRegisteTheCategory[0].id})
                }
            }

            // const alrearyRegisteTheCategory = await Category.find({ title: productLineSplit[1] })
            
            // let dataOfRegister = {}
            // let idCard = ''
            // let idCategory = ''
            // if (!alrearyRegisteTheCategory) {
            //     const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 6)
            //     idCategory = nanoid(6)
            //     let findDuplicate = await Card.findOne({ id: idCategory })
            //     if (findDuplicate) {
            //         idCategory = nanoid(6)
            //     }
            // } else {
            //     idCategory = alrearyRegisteTheCategory.id
            // }
            // const viewTypeCategory = typeof (productLineSplit[1])
            // // To create dataOfRegister
            // const nanoid = customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVXYZ', 6)
            //     idCard = nanoid(6)
            //     let findDuplicate = await Card.findOne({ id: idCard })
            //     if (findDuplicate) {
            //         idCard = nanoid(6)
            //     }
            // if (viewTypeCategory == "string") {
            //     dataOfRegister = {
            //         "title": productLineSplit[0],
            //         "category": [{ "idCategory": idCategory, "title": productLineSplit[1], "_id": false }],
            //         "id": idCard
            //     }
            // } else {
            //     let splitCategoriesName = productLineSplit[1].map((category) => {
            //         return { "idCategory": idCategory, "title": category}
            //     })
            //     dataOfRegister = {
            //         "title": productLineSplit[0],
            //         "category": {...splitCategoriesName, "_id": false},
            //         "id": idCard
            //     }
            // }
            // Card.create(dataOfRegister, (err) => {
            //     console.log("Erro abaixo")
            //     console.log(err)
            //     if (err) {
            //         return res.status(400).json({
            //             error: true,
            //             message: "Erro ao cadastrar um novo insight!"
            //         })
            //     }
            //     return res.status(200).json({
            //         error: false,
            //         message: `Insight: ${productLineSplit[0]} cadastrado com sucesso.`
            //     })
            // })
        }
    }
}

module.exports = new ImportController();