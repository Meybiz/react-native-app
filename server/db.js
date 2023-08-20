const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "002003a",
    host: 'localhost',
    port: 5432,
    database: "coffee",
})

module.exports = pool