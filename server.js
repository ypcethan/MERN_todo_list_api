const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')


const app = express()


if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: "./config/dev.env" })
    app.use(morgan('dev'))
}

// Middleware

// Mounting routers

app.get('/', (req, res, next) => {
    res.json('Hello')
})
const PORT = process.env.PORT || 5000
const start = () => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}


module.exports = { app, start }



