const mongoose = require('mongoose')
require('dotenv').config()

const getUriByEnv = () => {
    const uriLocal = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    if (process.env.NODE_ENV === 'testing') {
        return process.env.MONGO_URL
    }
    return process.env.URL_MONGODB
}
class Connection {
    constructor() {
        this.dataBaseConnectionMongoDB();
    }


    dataBaseConnectionMongoDB() {
        mongoose.connect("pmongodb+srv://diFrance:Gab24115682@cluster0.5suzr.mongodb.net/test?authSource=admin&replicaSet=atlas-ww7ap2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
            .then(() => { console.log('Conectado ao banco de dados com sucesso.') })
            .catch((err) => { console.log(err) })
    }
}

module.exports = new Connection();