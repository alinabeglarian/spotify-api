const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')
const Song = require('../song/model')

const router = new Router()

router.post(
  '/playlists',
  auth,
  (req, res, next) => {

    const playlist = {
      name: req.body.name,
      userId: req.user.id
    }
    
    Playlist
    .create(playlist)
    .then(playlist => res
      .status(201)
      .json({New_Playlist: playlist}))
    .catch(error => next(error))
  }
)

router.get(
  '/playlists',
  auth,
  (req, res, next) => { 

  const currentUser = req.user.id
    
  Playlist
    .findAll({
      where: {
        userId: currentUser
      }
    })
    .then(playlists => res.json({Playlists: playlists}))
    .catch(error => next(error))
  }
)

router.get(
  '/playlists/:id',
  auth,
  (req, res, next) => {

  const playlistId = req.params.id
  const userId = req.user.id

  Playlist
    .findByPk(playlistId, {include: [Song]})
    .then(playlist => {
      if (playlist && userId == playlist.userId) {
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

  const playlistId = req.params.id
  const currentUser = req.user.id

  Playlist
    .findByPk(playlistId)
    .then(playlist => {
      if (!playlist || playlist.userId !== currentUser) {
        res
          .status(404)
          .json({message: "This playlist does not exist"})
      } else {
        playlist.destroy()
        .then(playlist => {
          res
            .status(200)
            .json({message: "Playlist has succesfully been deleted"})
        })
      }
    })
    .catch(error => next(error))
  }
)


module.exports = router