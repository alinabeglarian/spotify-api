const Sequelize = require('sequelize')
const db = require('../db')
const User = require('../user/model')

const Playlist = db.define(
  'playlist', 
  {
    name: {
      type: Sequelize.STRING,
      field: 'playlist_name',
    }
  },
  { 
    tableName: 'spotify_playlists',
    timestamps: false
  },
)

Playlist.belongsTo(User)

module.exports = Playlist