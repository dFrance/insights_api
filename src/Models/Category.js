const mongoose = require('mongoose')

const Category = mongoose.Schema({
    title: { type: String, required: true, },
    idCategory: { type: String, required: true},
}, {
    timestamps: true,
})

module.exports = mongoose.model('Category', Category)