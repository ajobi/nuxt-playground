const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 4000

const baseUrl = 'http://localhost:3000'

app.get('/', async (req, res) => {
  const response = await fetch(baseUrl)
  const data = await response.text()
  res.send(data)
})

app.get('/header', async (req, res) => {
  const response = await fetch(`${baseUrl}/header`)
  const data = await response.text()
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
