import React, {Component} from 'react'
import {connect} from 'react-redux'

import AddNewSongContainer from './AddNewSongContainer.js'
import MusicTableContainer from './MusicTableContainer.js'
import MusicTableToolbarContainer from './MusicTableToolbarContainer.js'

class SongRepositoryContainer extends Component {
  render() {
    return (
      <div>
        <MusicTableToolbarContainer
          event_onLoginAccountChange={this.props.event_onLoginAccountChange}
          event_finishEditSong={this.props.event_finishEditSong}
          event_finishDeleteSong={this.props.event_finishDeleteSong}
          event_onAddSongToPlaylist={this.props.event_onAddSongToPlaylist}
        />
        <MusicTableContainer />
        <AddNewSongContainer
          event_addNewSong={this.props.event_addNewSong}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginAccount: state.accountReducer.loginAccount,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SongRepositoryContainer)
