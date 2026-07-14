import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const dist = join(__dirname, 'dist')

app.use(express.static(dist))

// SPA fallback — if no file matches, serve index.html
app.use((req, res) => {
  res.sendFile(join(dist, 'index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Novadent Dental Hospital running on port ${PORT}`)
})
