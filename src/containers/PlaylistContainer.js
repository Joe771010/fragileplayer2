import React, {Component} from 'react'
import {connect} from 'react-redux'

import Playlist from '../components/Playlist.js'

import {playlistDoubleClickAction, playlistToolMenuClickAction, playlistToolMenuCoseAction,
        playlistSongMoveUpAction, playlistSongMoveDownAction, playlistSongDeleteAction} from '../actions/playlistActions'

class PlaylistContainer extends Component {
  render() {
    return (
      <div>
        <Playlist
          playlistSongs={this.props.playlistSongs}
          currentSongIndex={this.props.currentSongIndex}
          event_onDoubleClick={this.props.event_onDoubleClick}
          event_onToolMenuClick={this.props.event_onToolMenuClick}
          event_onToolMenuClose={this.props.event_onToolMenuClose}
          toolMenuAnchor={this.props.toolMenuAnchor}
          event_onMoveUp={()=>{
            this.props.event_onPlaylistSongMove('MOVE_UP')
            this.props.event_onMoveUp()
          }}
          event_onMoveDown={()=>{
            this.props.event_onPlaylistSongMove('MOVE_DOWN')
            this.props.event_onMoveDown()
          }}
          event_onDelete={()=>{
            this.props.event_onPlaylistSongMove('DELETE')
            this.props.event_onDelete()
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginAccount: state.accountReducer.loginAccount,
  playlistSongs: state.playlistReducer.playlistSongs,
  toolMenuAnchor: state.playlistReducer.toolMenuAnchor,
  currentSongIndex: state.playlistReducer.currentSongIndex
})

const mapDispatchToProps = (dispatch) => ({
  event_onDoubleClick: (song, index) => {
    dispatch(playlistDoubleClickAction(song, index))
  },
  event_onToolMenuClick: (event, index) => {
    dispatch(playlistToolMenuClickAction(event.target, index))
  },
  event_onToolMenuClose: () => {
    dispatch(playlistToolMenuCoseAction())
  },
  event_onMoveUp: () => {
    dispatch(playlistSongMoveUpAction())
  },
  event_onMoveDown: () => {
    dispatch(playlistSongMoveDownAction())
  },
  event_onDelete: () => {
    dispatch(playlistSongDeleteAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer)
