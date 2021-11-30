const mongoose = require('mongoose')

const Card = mongoose.Schema({
    title: { type: String, required: true, },
    category: [{
        title: { type: String },
        idCategory: { type: String },
    }],
    id: { type: String, required: true },
}, {
    // timestamps: true,
})

module.exports = mongoose.model('card', Card)