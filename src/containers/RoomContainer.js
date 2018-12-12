import React, {Component} from 'react'
import {connect} from 'react-redux'

import Room from '../components/Room.js'

import { playlistDoubleClickAction, roomSongDeleteAction } from '../actions/playlistActions'

class RoomContainer extends Component {
  render() {
    return (
      <div>
        <Room
          playlistSongs={this.props.playlistSongs}
          currentSongIndex={this.props.currentSongIndex}
          event_onDoubleClick={this.props.event_onDoubleClick}
          event_onRoomSongDelete={(song, index)=>{
            this.props.event_onRoomSongDelete(song, index)
            if(song.owner===this.props.loginAccount) this.props.event_onDelete(index)
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginAccount: state.accountReducer.loginAccount,
  playlistSongs: state.playlistReducer.playlistSongs,
  currentSongIndex: state.playlistReducer.currentSongIndex
})

const mapDispatchToProps = (dispatch) => ({
  event_onDoubleClick: (song, index) => {
    dispatch(playlistDoubleClickAction(song, index))
  },
  event_onDelete: (index) => {
    dispatch(roomSongDeleteAction(index))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer)
