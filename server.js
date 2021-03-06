const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const PORT = process.env.PORT || 8766
const ScrapeController = require('./controllers/scrape.controller')

app.use(cors())
app.use(helmet())

app.get('/category',ScrapeController.onGoing)
app.get('/detail',ScrapeController.animeDetail)
app.get('/anime',ScrapeController.anime)
app.get('/search',ScrapeController.searchAnime)
// app.get('*', (req,res)=>{
//     res.send('<h2>Muaach</h2>')
// })

app.listen(PORT, ()=>{
    console.log('Server connected on port'+PORT)
})