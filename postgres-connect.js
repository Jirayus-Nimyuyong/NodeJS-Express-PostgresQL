const { Pool } = require('pg')
const config = require('config')

const connect = {
  host: config.get('pg.host'),
  user: config.get('pg.user'),
  password: config.get('pg.pass'),
  database: config.get('pg.database'),
  port: config.get('pg.port')
}
const pool = new Pool(connect)
const connectDB = async () => {
  try {
    const connect = await pool.query(`
    SELECT 
      current_database() AS "database", 
      TO_CHAR( NOW(),'HH24:MI:SS DD/MM/YYYY') AS "time"
    `)
    const { rows: [data] } = connect
    console.log(`Connected To The PostgresQL Database ${data.database} Time Connect ${data.time}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  pool,
  connectDB
}
