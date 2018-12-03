import React, {Component} from 'react'
import {connect} from 'react-redux'

import firebase from 'firebase/app';
import 'firebase/database';

import PlaylistToolbar from '../components/PlaylistToolbar.js'
import NewPlaylistDialog from '../components/NewPlaylistDialog.js'
import DeletePlaylistDialog from '../components/DeletePlaylistDialog.js'

import {newPlaylistOpenAction, newPlaylistChangeAction, newPlaylistCloseAction, refreshPlaylistsAction, playlistChangeAction } from '../actions/playlistActions'
import {deletePlaylistOpenAction, deletePlaylistCloseAction} from '../actions/playlistActions'

class PlaylistToolbarContainer extends Component {

  event_onPlaylistChange(event) {
    let newPlaylist = event.target.value;
    this.firebaseRef = firebase.database().ref('users/' + this.props.loginAccount + '/playlists/' + newPlaylist);
    let songs = [];
    this.firebaseRef.once('value', dbSongs => {
      dbSongs.forEach(dbSong => {
        songs.push({
          videoId: dbSong.val().video_id,
          title: dbSong.val().title,
          artist: dbSong.val().artist,}
        );
      })
      this.props.changePlaylist(newPlaylist, songs);
    })
  }


  render() {
    return (
      <div>
        <PlaylistToolbar
          currentPlaylist={this.props.currentPlaylist}
          playlists={this.props.playlists}
          event_onPlaylistChange={(event)=>this.event_onPlaylistChange(event)}
          event_onNewPlaylistClick={this.props.event_onNewPlaylistClick}
          event_onDeletePlaylistClick={this.props.event_onDeletePlaylistClick}
        />
        <NewPlaylistDialog
          newPlaylist={this.props.newPlaylist}
          displayNewPlaylistDialog={this.props.displayNewPlaylistDialog}
          event_onNewPlaylistClose={(ok)=>this.props.event_onNewPlaylistClose(ok)}
          event_onNewPlaylistChange={this.props.event_onNewPlaylistChange}
        />
        <DeletePlaylistDialog
          displayDeletePlaylistDialog={this.props.displayDeletePlaylistDialog}
          event_onDeletePlaylistClose={(ok)=>{
            if(ok) this.props.event_onDeletePlaylist()
            this.props.event_onDeletePlaylistClose(ok)
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginAccount: state.accountReducer.loginAccount,
  playlistSongs: state.playlistReducer.playlistSongs,
  currentPlaylist: state.playlistReducer.currentPlaylist,
  playlists: state.playlistReducer.playlists,
  newPlaylist: state.playlistReducer.newPlaylist,
  displayNewPlaylistDialog: state.playlistReducer.displayNewPlaylistDialog,
  displayDeletePlaylistDialog: state.playlistReducer.displayDeletePlaylistDialog,
})

const mapDispatchToProps = (dispatch) => ({
  // create new playlist
  event_onNewPlaylistClick: () => {
    dispatch(newPlaylistOpenAction())
  },
  event_onNewPlaylistChange: (event) => {
    dispatch(newPlaylistChangeAction(event.target.value))
  },
  event_onNewPlaylistClose: (ok) => {
    dispatch(newPlaylistCloseAction(ok))
  },
  // delete current playlist
  event_onDeletePlaylistClick: () => {
    dispatch(deletePlaylistOpenAction())
  },
  event_onDeletePlaylistClose: (ok) => {
    dispatch(deletePlaylistCloseAction(ok))
  },
  //
  refreshPlaylists: (playlists) => {
    dispatch(refreshPlaylistsAction(playlists))
  },
  changePlaylist: (playlist, songs) => {
    dispatch(playlistChangeAction(playlist, songs))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistToolbarContainer)
