import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cookieParser())

// Set cookies on specific paths before static files are served
app.get('/full-metal-alchemist-brotherhood', (req, res, next) => {
  res.cookie('favorite', 'anime=Fullmetal Alchemist: Brotherhood', { path: '/', httpOnly: false, secure: false, sameSite: 'Lax' })
  next()
  res.redirect('/full-metal-alchemist-brotherhood.html') // Redirect to the actual HTML file
})

app.get('/lies-of-locke-lamora', (req, res, next) => {
  res.cookie('favorite', 'book=Lies of Locke Lamora', { path: '/', httpOnly: false, secure: false, sameSite: 'Lax' })
  next()
  res.redirect('/lies-of-locke-lamora.html') // Redirect to the actual HTML file
})

app.get('/hatteras', (req, res, next) => {
  res.cookie('favorite', 'place=Hatteras', { path: '/', httpOnly: false, secure: false, sameSite: 'Lax' })
  next()
  res.redirect('/hatteras.html') // Redirect to the actual HTML file
})

app.get('/linus-sebastian', (req, res) => {
  res.cookie('favorite', 'personality=Linus Sebastian', { path: '/', httpOnly: false, secure: false, sameSite: 'Lax' })
  res.redirect('/linus-sebastian.html') // Redirect to the actual HTML file
})

// Serve static files after cookies are set
app.use('/', express.static(path.join(__dirname, 'favorites')))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})