const mongoose = require('mongoose')
require('dotenv').config()

    const uriLocal = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    const uriNuvem = "pmongodb+srv://diFrance:Gab24115682@cluster0.5suzr.mongodb.net/test?authSource=admin&replicaSet=atlas-ww7ap2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
    const uriTestMock = process.env.MONGO_URL

class Connection {
    constructor() {
        this.dataBaseConnectionMongoDB();
    }


    dataBaseConnectionMongoDB() {
        mongoose.connect(uriNuvem)
            .then(() => { console.log('Conectado ao banco de dados com sucesso.') })
            .catch((err) => { console.log(err) })
    }
}

module.exports = new Connection();