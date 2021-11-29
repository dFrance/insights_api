const mongoose = require('mongoose')


class Connection {
    constructor(){
        this.dataBaseConnectionMongoDB();
    }

    
    dataBaseConnectionMongoDB(){
        mongoose.connect('mongodb+srv://diFrance:Gab24115682@cluster0.5suzr.mongodb.net/insights')
        .then(()=>{console.log('Conectado ao banco de dados com sucesso.')})
        .catch((err) => {console.log(err)})
    }
}

module.exports = new Connection();