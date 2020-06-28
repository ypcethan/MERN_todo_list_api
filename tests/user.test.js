const request = require('supertest')
const { clearDatabase, closeDatabase, connect } = require('./test-db-setup')
const { app } = require('../server')
const User = require('../models/User')
const { userOneData, userTwoData } = require('./fixture/user.fixture')
beforeAll(async () => {
    await connect()
})

afterAll(async () => {
    await closeDatabase
})


const baseUrl = '/api/users'
describe('Register user', () => {
    test('Should be able to register a user and password should be hashed', async () => {
        const response = await request(app)
            .post(baseUrl + '/register')
            .send(userOneData)
            .expect(200)
        const user = await User.findOne({ email: userOneData.email })
        expect(user).not.toBeNull()
        expect(user.password).not.toBe(userOneData.password)
    });
});