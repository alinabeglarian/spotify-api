const { Router } = require('express')
const Song = require('./model')
const auth = require('../auth/middleware')
const Playlist = require('../playlist/model')

const router = new Router()

router.post(
  '/playlists/:id/songs',
  auth,
  (req, res, next) => {
  
  const playlistId = req.params.id
  const currentUser = req.user.id

  const song = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    playlistId: playlistId
  }

  Playlist
    .findByPk(playlistId)
    .then(playlist => {
      if (!playlist || currentUser !== playlist.userId) {
        res
          .status(404)
          .send({Message: "This playlist does not exist"})
      } else {
        Song
          .create(song)
          .then(song => 
            res
              .status(201)
              .json({New_Song: song}))
          .catch(error => next(error))
      }
    })
  }
)

module.exports = router