const Sequelize = require('sequelize')
const db = require('../db')

const Playlist = db.define(
  'playlist', 
  {
    name: {
      type: Sequelize.STRING,
      field: 'playlist_name',
    }
  },
  { tableName: 'spotify_playlists',
    timestamps: false
  },
)

module.exports = Playlist