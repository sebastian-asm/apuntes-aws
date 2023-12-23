import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { dbConnection, createTableDefault } from './db.js'

dotenv.config()
const server = express()
server.use([express.json(), cors()])

await createTableDefault()

server.get('/', async (req, res) => {
  const db = dbConnection()
  try {
    await db.connect()
    const { rows, rowCount } = await db.query('SELECT * FROM users')
    res.json({ users: rows, count: rowCount })
  } catch (error) {
    res.status(500).json({ error: error?.message })
  } finally {
    await db.end()
  }
})

server.post('/', async (req, res) => {
  const db = dbConnection()
  const { name, email } = req.body

  try {
    const text = 'INSERT INTO users(name, email) VALUES($1, $2)'
    const values = [name, email]
    await db.connect()
    await db.query(text, values)
    res.status(201).json({ message: 'Successfully created user' })
  } catch (error) {
    res.status(500).json({ error: error?.message })
  } finally {
    await db.end()
  }
})

server.listen(process.env.PORT, () => console.log('Server on port', process.env.PORT))
