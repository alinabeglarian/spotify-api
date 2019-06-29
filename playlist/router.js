const { Router } = require('express')
const Playlist = require('./model')

const router = new Router()

router.post(
  '/playlists',
  (req, res, next) => Playlist
    .create(req.body)
    .then(playlist => res.status(201).json(playlist))
    .catch(error => next(error))
)

router.get(
  '/playlists', 
  (req, res, next) => Playlist
    .findAll()
    .then(playlists => res.send(playlists))
    .catch(error => next(error))
)




module.exports = router