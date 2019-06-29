const express = require('express')
const db = require('./db')
const Playlist = require('./playlist/model')
const PlaylistRouter = require('./playlist/router')
const bodyParser = require('body-parser')
const Song = require('./song/model')
const SongRouter = require('./song/router')


const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Listening on port ${port}!`))

const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(PlaylistRouter)
app.use(SongRouter)