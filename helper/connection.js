require('dotenv').config({path: '../.env'})
const { Client } = require('pg')

const db = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

db.connect((err) => {
    if (err) {
        console.log('db connection error', err)
    } else {
        console.log('Database connected - PostgreSQL');
    }
})

module.exports = db