const express = require('express')
const router = express.Router()
const ScrapeController = require('../controllers/scrape.controller')

router.get('/category',ScrapeController.onGoing)
router.get('/detail',ScrapeController.animeDetail)
router.get('/anime',ScrapeController.anime)
router.get('/search',ScrapeController.searchAnime)

module.exports = router