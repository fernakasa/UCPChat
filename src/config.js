import { config } from 'dotenv'
config()

export default {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  pass: process.env.DB_PASS || 'postgis',
  database: process.env.DB_BASE || 'chat',
  secret: process.env.TOKEN_SECRET || 'mysecretkey',
  port: process.env.APP_PORT || 3000,
}
