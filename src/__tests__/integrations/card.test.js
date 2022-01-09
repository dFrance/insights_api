const request = require('supertest');
const app = require('../../app');
const Card = require('../../Models/Card');
const Category = require('../../Models/Category');

describe('Should get the cards', () => {
    it('Should get a response status 200', async () => {
        const response = await request(app)
            .get('/cards')
        expect(response.status).toBe(200);
        expect(typeof (response)).toBe('object' || 'array');
    })
})
describe('Should post cards', () => {
    it('Should not post a empty title card', async () => {
        const response = await request(app).post('/cards').send({ title: "" })
        expect(response.status).toBe(400)
    })
    it('Should not post a card with empty category title', async () => {
        const response = await request(app).post('/cards').send({ title: "Testando um post.", category: [{idCategory: "DAS556", title: ""}] })
        expect(response.body.message).toMatch("Uma das categorias não existe.")
    })
    it('Should not post a card with empty category id', async () => {
         const response = await request(app).post('/cards').send({ title: "Testando um post.", category: [{idCategory: "", title: "TEMPORADA"}] })
         expect(response.body.message).toMatch("Uma das categorias não existe.")
    })
    it('Should not post a card with wrong category title', async () => {
         const response = await request(app).post('/cards').send({ title: "Testando um post.", category: [{idCategory: "MGOS9E", title: "wrongTitle"}] })
         expect(response.body.message).toMatch("Uma das categorias não existe.")
    })
    it('Should not post a card with wrong category id', async () => {
         const response = await request(app).post('/cards').send({ title: "Testando um post.", category: [{idCategory: "wrongID", title: "TEMPORADA"}] })
         expect(response.body.message).toMatch("Uma das categorias não existe.")
    })
    it('Should post a card, without category', async () => {
        const response = await request(app).post('/cards').send({ title: "Testando um post." })
        expect(response.body.message).toMatch("Insight: Testando um post. cadastrado com sucesso.")
    })
    it('Should post a card with category', async () => {
        const {idCategory, title} = await Category.findOne({})
        const response = await request(app).post('/cards')
        .send({ 
            title: "Testando um post com categoria.", 
            category: [{idCategory, title}]
        })
        expect(response.body.message).toMatch("Insight: Testando um post com categoria. cadastrado com sucesso.")
    })
})