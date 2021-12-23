const request = require('supertest');
const app = require('../../app');
const { store } = require('../../Controller/CategoryController');
const Category = require('../../Models/Category');

describe('Should get the categories', () => {
    it('Should get an array', async () => {
        const response = await request(app)
            .get('/category')

        expect(response.status).toBe(200);
        expect(typeof (response.body)).toBe('object' || 'array');
    })
    describe('Should post categories', () => {
        it('Should not post a empty category', async () => {
            const response = await request(app).post('/category').send({ title: "" })
            expect(response.status).toBe(400)
        })
        it('Should post a category', async () => {
            const response = await request(app).post('/category').send({ title: "TEMPORADA" })
            expect(response.body.error).toBe(false)
        })
        it('Should not post a category exist', async () => {
            const response = await request(app).post('/category').send({ title: "TEMPORADA" })
            expect(response.body.message).toMatch('Nome de categoria já cadastrado!')
        })
    })
})
