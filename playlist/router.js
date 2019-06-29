const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.post(
  '/playlists',
  auth,
  (req, res, next) => Playlist
    .create(req.body)
    .then(playlist => res
      .status(201)
      .json({New_Playlist: playlist}))
    .catch(error => next(error))
)

router.get(
  '/playlists',
  auth,
  (req, res, next) => Playlist
    .findAll()
    .then(playlists => res.json({Playlists: playlists}))
    .catch(error => next(error))
)

router.get(
  '/playlists/:id',
  auth,
  (req, res, next) => {

  const id = req.params.id

  Playlist
    .findByPk(id)
    .then(playlist => {
      if (playlist) {
        res.json({Playlist: playlist})
      } else {
        res.status(404).json({message: 'Playlist not found'})
      }
    })
    .catch(error => next(error))
  }
)

router.delete(
  '/playlists/:id',
  auth,
  (req, res, next) => {

  const id = req.params.id

  Playlist
    .findByPk(id)
    .then(playlist => playlist.destroy({playlist}) )
    .then(playlist => res
      .status(200)
      .json({message: 'Playlist had succesfully been deleted'}))
    .catch(error => next(error))
  }
)


module.exports = router