const fetch = require('isomorphic-fetch')
const cheerio = require('cheerio')

// base url
const BASE_URL = 'https://otakudesu.info/'

module.exports = {
    animeList: async(req, res) => {
        // const q = req.query.cat;
        // console.log(q);
        const resp = await fetch(`${BASE_URL}anime-list`);
        try{
            const HOST_NAME = `https://${req.headers.host}`;

            if(resp.status >= 400){res.json({
                status: resp.status,
                message: resp.statusText,
            })}else{
                const text = await resp.text();
                const $ = cheerio.load(text);
                console.log($);
                let jsonData = [];
                $('#venkonten > div.vezone > div.venser > div.daftarkartun > div#abtext > div.bariskelom > div.penzbar > div.jdlbar').each(function(i, e){
                    const $e = $(e);
                    // if($e != ""){
                    jsonData.push({});
                    jsonData[i].title = $e.find("div > ul > li > a").text();
                    jsonData[i].linkUrl = $e.find("div > ul > li > a").attr('href');
                    
                });
                res.json({
                    data: jsonData
                })

            }

        }catch(e){
            console.log(e)
            res.status(500).json({
                message: e
            })

        }

            // res.json({
            //     message: "hello world"
            // })
    },
    onGoing: async (req, res) => {
        const q = req.query.cat
        const resp = (q === 'ongoing')? await fetch(`${BASE_URL}ongoing-anime/`) : await fetch(`${BASE_URL}complete-anime/`)
        try {
            const HOST_NAME = `https://${req.headers.host}`
           
            if (q === 'ongoing' || q === 'complete') {
                
                if (resp.status >= 400) { res.json({
                    status: resp.status,
                    message: resp.statusText
                })}else {
                    const text = await resp.text()
                    const $ = cheerio.load(text)
                    console.log($)
                    var jsonData = []
                    $('#venkonten > div.vezone > div.venser > div.venutama > div > div > div.venz > ul > li').each(function (i, e) {
                        jsonData.push({})
                        const $e = $(e)
                        jsonData[i].imgUrl = $e.find('div > div.thumb > a > div.thumbz > img').attr('src')
                        jsonData[i].title = $e.find('div > div.thumb > a >div.thumbz > h2').text()
                        jsonData[i].slug = $e.find('div > div.thumb > a ').attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')
                        jsonData[i].linkUrl = `${HOST_NAME}/detail?slug=`+$e.find('div > div.thumb > a ').attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')
                        jsonData[i].episode = $e.find('div > div.epz').text().trim()
                        jsonData[i].rating = $e.find('div > div.epztipe').text().trim()
                        jsonData[i].date = $e.find('div > div.newnime').text().trim()
    
                    })
                    res.json({
                        category: q,
                        data: jsonData
                    })
                }
               
            } else {
                res.json({
                    message: 'Not Found!'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error
            })
        }
    },
    anime: async (req, res) => {
        try {
            const HOST_NAME = `https://${req.headers.host}`
            const resp = await fetch(`${BASE_URL}${req.query.slug}`)
            const text = await resp.text()
            const $ = cheerio.load(text)
            
            if (resp.status >= 400) return res.json({
                status: resp.status,
                message: resp.statusText
            })
            
            var downloadList = []
            var prevnext = []
            var jsonData = []
            if (resp.status >= 400) return res.json({
                status: resp.status,
                message: 'error'
            })
            $('#venkonten > div.venser > div.venutama').each(function (i, e) {
                jsonData.push({})
                const $e = $(e)
                jsonData[i].title = $e.find('h1.posttl').text()
                jsonData[i].streamUrl = $e.find('#pembed > div > iframe').attr('src')
                 
            })
            // PREV NEXT
            $('#venkonten > div.venser > div.venutama > div.prevnext > div.flir > a').each(function (i, e) {
                prevnext.push({})
                const $e = $(e)

                prevnext[i].name = $e.text()
                prevnext[i].slug = $e.attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')
                prevnext[i].linkUrl = ($e.text() === 'Next Eps.' || $e.text() === 'Previous Eps.')?`${HOST_NAME}/anime?slug=`+$e.attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')
                :`${HOST_NAME}/detail?slug=`+$e.attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')

                 
            })
            // download
            $('#venkonten > div.venser > div.venutama > div.download > ul > li').each(function (i, e) {
                downloadList.push({})
                const $e = $(e)

                downloadList[i].type = $e.find('strong').text()
                downloadList[i].link = $e.find('a').attr('href')


            })

            res.json({

                data: jsonData,
                nav: prevnext,
                download: downloadList

            })
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    },
    animeDetail: async (req, res) => {

        try {
            const HOST_NAME = `https://${req.headers.host}`
            const resp = await fetch(`${BASE_URL}${req.query.slug}`)
            const text = await resp.text()
            const $ = cheerio.load(text)
        
            if (resp.status >= 400) return res.json({
                status: resp.status,
                message: resp.statusText
            })
            var jsonData = []
            var listEpisode = []
            if (resp.status >= 400) return res.json({
                status: resp.status,
                message: 'error'
            })
            $('#venkonten > div.venser').each(function (i, e) {
                jsonData.push({})
                const $e = $(e)
                jsonData[i].imgUrl = $e.find('div.fotoanime > img').attr('src')

                jsonData[i].title = $e.find('div.jdlrx > h1').text()
                jsonData[i].info = $e.find('div.fotoanime > div.infozin > div.infozingle').html().replace(/(?:https?|ftp):\/\/[\n\S]+/g, '#"')
                jsonData[i].synopsis = $e.find('div.fotoanime > div.sinopc > p').text().trim()
            })
            // List Episode
            $('#venkonten > div.venser > div:nth-child(8) > ul > li').each(function (i, e) {
                listEpisode.push({})
                const $e = $(e)
                var text = $e.find('span > a').text()
                listEpisode[i].titleEp = text
                listEpisode[i].slug = $e.find('span > a').attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')
                listEpisode[i].linkUrl = `${HOST_NAME}/anime?slug=`+$e.find('span > a').attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')
            })
            res.json({

                data: jsonData,
                listEpisode: listEpisode,
                stream: this.anime
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error
            })
        }
    },
    searchAnime: async(req,res)=>{
        try {
            const HOST_NAME = `https://${req.headers.host}`
            const resp = await fetch(`${BASE_URL}?s=${req.query.q}&post_type=anime`)
            const text = await resp.text()

            const $ = cheerio.load(text)

            if (resp.status >= 400) return res.json({
                status: resp.status,
                message: resp.statusText
            })
            var jsonData = []
            var listEpisode = []
            if (resp.status >= 400) return res.json({
                status: resp.status,
                message: 'error'
            })
            $('#venkonten > div.vezone > div.venser > div.venutama > div.page > ul > li').each(function (i, e) {
                jsonData.push({})
                const $e = $(e)
                jsonData[i].imgUrl = $e.find('img').attr('src')
                jsonData[i].title = $e.find('h2 > a').text()
                jsonData[i].slug = $e.find('h2 > a ').attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')
                jsonData[i].linkUrl = `${HOST_NAME}/detail?slug=`+$e.find('h2 > a').attr('href').replace(/^.*\/\/[^\/]*/, '').replace('/', '')
                jsonData[i].genre = $e.find('div:nth-child(3)').text().trim().replace('Genres : ','')
                jsonData[i].status = $e.find('div:nth-child(4)').text().trim().replace('Status : ','')
                jsonData[i].rating = $e.find('div:nth-child(5)').text().trim().replace('Rating : ','')
               

            })
            res.json({
                data: jsonData,
            })
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    }
}