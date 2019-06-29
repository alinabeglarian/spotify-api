const { Router } = require('express')
const Song = require('./model')

const router = new Router()

router.post(
  '/playlists/:id/songs',
  (req, res, next) => 
  Song
    .create(req.body)
    .then(song => res
      .status(201)
      .json({New_Song: song}))
    .catch(error => next(error))
)

router.get(
  '/playlists/:id/songs', 
  (req, res, next) => Song
    .findAll()
    .then(songs => res.json({Songs: songs}))
    .catch(error => next(error))
)

module.exports = router