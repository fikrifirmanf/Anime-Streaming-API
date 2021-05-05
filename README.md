# Documentation

This is a Restful API about anime streaming created using **NodeJS**.

## Demo

<#>
Comming Soon

## Installation

```
git clone https://github.com/fikrifirmanf/Anime-Streaming-API.git
cd Anime-Streaming-API
npm install
```

### Running on Dev Mode

```
npm run dev
```

### Status Code

#### Response Code

```
200: Success
302: Moved
500: Internal Server Error
```

## REST API

GET <http://localhost:3000/search?q=boruto> --> Search anime

GET <http://localhost:3000/anime?slug=skms-episode-2-sub-indo> --> Getting anime streaming link

GET <http://localhost:3000/detail?slug=anime/megalo-box-s2-sub-indo/> --> Getting anime detail

GET <http://localhost:3000/category?cat=ongoing> --> Getting anime category ongoing/complete

## Data Source

<https://otakudesu.moe/>

### NOT FOR COMMERCIAL

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
