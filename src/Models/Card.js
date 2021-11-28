const mongoose = require('mongoose')

const Card = mongoose.Schema({
    title: { type: String, required: true, },
    category: [{
        title: { type: String, required: true },
        id: { type: String, required: true },
        _id: false
    }],
    id: { type: String, required: true, unique: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model('card', Card)