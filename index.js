const express = require('express')
const db = require('./db')
const Playlist = require('./playlist/model')
const PlaylistRouter = require('./playlist/router')

const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Listening on port ${port}!`))

app.use(PlaylistRouter)