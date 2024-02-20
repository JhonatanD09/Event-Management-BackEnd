import mysql from "mysql2/promise";
const config = require('../../application/config/config')

const pool = mysql.createConnection({
    host: config.mysql.host,
    database: config.mysql.database,
    user: config.mysql.user,
    password : config.mysql.password
}

)

export default pool