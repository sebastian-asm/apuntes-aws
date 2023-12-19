import { createReadStream } from 'fs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'

dotenv.config()
const server = express()

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEYID,
    secretAccessKey: process.env.AWS_ACCESSKEY
  }
})

server.use([
  cors(),
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
  })
])

async function uploadFile(file) {
  const { tempFilePath, name } = file
  const stream = createReadStream(tempFilePath)
  const config = {
    Bucket: process.env.AWS_BUCKET,
    Key: name,
    Body: stream
  }
  const command = new PutObjectCommand(config)
  return await s3Client.send(command)
}

server.post('/file', async (req, res) => {
  try {
    const { file } = req.files
    const result = await uploadFile(file)
    res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
})

server.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`))
