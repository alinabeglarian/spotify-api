const { Router } = require('express')
const Song = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.post(
  '/playlists/:id/songs',
  auth,
  (req, res, next) => 
  Song
    .create(req.body)
    .then(song => 
      res
        .status(201)
        .json({New_Song: song}))
    .catch(error => next(error))
)

router.get(
  '/playlists/:id/songs',
  auth,
  (req, res, next) => {

  const id = req.params.id

  Song
    .findAll()
    .then(songs => 
      songs.filter(songs => songs.playlistId == id))
    .then(songs => res.json({Songs: songs}))
    .catch(error => next(error))
  }
)

module.exports = router