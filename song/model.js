const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define(
  'song', 
  {
    title: {
      type: Sequelize.STRING,
      field: 'song_title',
    },
    artist: {
      type: Sequelize.STRING,
      field: 'artist_name',
    },
    album: {
      type: Sequelize.STRING,
      field: 'album_title',
    }
  },
  { 
    tableName: 'spotify_songs',
    timestamps: false
  },
)

module.exports = Song