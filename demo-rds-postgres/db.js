import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

export function dbConnection() {
  return new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  })
}

export async function createTableDefault() {
  const db = dbConnection()
  const createTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  try {
    console.log('Connecting to db...')
    await db.connect()
    await db.query(createTable)
    console.log('Success connection to db')
  } catch (error) {
    console.log(error)
  } finally {
    await db.end()
  }
}
