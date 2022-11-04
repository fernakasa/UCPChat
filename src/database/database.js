import pg from 'pg'
import config from './../config.js'

const { Pool } = pg

export const pool = new Pool({
  host: config.host,
  user: config.user,
  password: config.pass,
  database: config.database,
}) // Crea la conexion a la base de datos utilizando los datos de datos

pool.connect((err) => {
  //Probar si se pierde la conexion
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused')
    }
  } else {
    console.log('DB is Connected')
  }
})
