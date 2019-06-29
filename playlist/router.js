const { Router } = require('express')
const Playlist = require('./model')

const router = new Router()

router.get('/playlists', (req, res, next) => {
  Playlist.findAll()
    .then(playlists => res.json(playlists))
    .catch(err => next(err))
})

module.exports = router