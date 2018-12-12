import React, {Component} from 'react'
import {connect} from 'react-redux'

import firebase from 'firebase/app';
import 'firebase/database';

import PlaylistToolbar from '../components/PlaylistToolbar.js'
import NewPlaylistDialog from '../components/NewPlaylistDialog.js'
import DeletePlaylistDialog from '../components/DeletePlaylistDialog.js'
import EnterRoomDialog from '../components/EnterRoomDialog.js'

import {refreshPlaylistsAction, playlistChangeAction } from '../actions/playlistActions'
import {newPlaylistOpenAction, newPlaylistInputChangeAction, newPlaylistDialogCloseAction } from '../actions/playlistActions'
import {deletePlaylistDialogOpenAction, deletePlaylistDialogCloseAction} from '../actions/playlistActions'
import {enterRoomOpenAction, enterRoomDialogCloseAction, enterRoomInputChangeAction, leaveRoomAction} from '../actions/playlistActions'

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

  event_onEnterRoomSucceed() {
    this.firebaseRef = firebase.database().ref('rooms/' + this.props.enterRoomName);

    this.firebaseRef.once('value', dbSongs => {
      let songs = [];
      dbSongs.forEach(dbSong => {
        songs.push({
          videoId: dbSong.val().video_id,
          title: dbSong.val().title,
          artist: dbSong.val().artist,
          owner: dbSong.val().owner,
        });
      })
      this.props.changePlaylist('', songs);
    })

    this.intervalId = setInterval(()=>{
      this.firebaseRef.once('value', dbSongs => {
        let songs = [];
        dbSongs.forEach(dbSong => {
          songs.push({
            videoId: dbSong.val().video_id,
            title: dbSong.val().title,
            artist: dbSong.val().artist,
            owner: dbSong.val().owner,
          });
        })
        this.props.changePlaylist('', songs);
      })
    }, 30000)
  }

  event_onLeaveRoom() {
    clearInterval(this.intervalId);
    this.props.event_onLeaveRoomClick();
  }

  render() {
    return (
      <div style={{paddingTop:'10px'}}>
        <PlaylistToolbar
          currentPlaylist={this.props.currentPlaylist}
          playlists={this.props.playlists}
          currentRoom={this.props.currentRoom}
          event_onPlaylistChange={(event)=>this.event_onPlaylistChange(event)}
          event_onNewPlaylistClick={this.props.event_onNewPlaylistClick}
          event_onDeletePlaylistClick={this.props.event_onDeletePlaylistClick}
          event_onEnterLeaveRoomClick={()=>{
            if (this.props.currentRoom===undefined) this.props.event_onEnterRoomClick();
            else this.event_onLeaveRoom();
          }}
        />
        <NewPlaylistDialog
          newPlaylist={this.props.newPlaylist}
          displayNewPlaylistDialog={this.props.displayNewPlaylistDialog}
          event_onNewPlaylistDialogClose={(ok)=>this.props.event_onNewPlaylistDialogClose(ok)}
          event_onNewPlaylistInputChange={this.props.event_onNewPlaylistInputChange}
        />
        <DeletePlaylistDialog
          displayDeletePlaylistDialog={this.props.displayDeletePlaylistDialog}
          event_onDeletePlaylistDialogClose={(ok)=>{
            if(ok) this.props.event_onDeletePlaylist()
            this.props.event_onDeletePlaylistDialogClose(ok)
          }}
        />
        <EnterRoomDialog
          enterRoomName={this.props.enterRoomName}
          displayEnterRoomDialog={this.props.displayEnterRoomDialog}
          event_onEnterRoomDialogClose={(ok)=>{
            this.props.event_onEnterRoomDialogClose(ok)
            if(ok) this.event_onEnterRoomSucceed()
          }}
          event_onEnterRoomInputChange={this.props.event_onEnterRoomInputChange}
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
  enterRoomName: state.playlistReducer.enterRoomName,
  currentRoom: state.playlistReducer.currentRoom,
  displayNewPlaylistDialog: state.playlistReducer.displayNewPlaylistDialog,
  displayDeletePlaylistDialog: state.playlistReducer.displayDeletePlaylistDialog,
  displayEnterRoomDialog: state.playlistReducer.displayEnterRoomDialog,
})

const mapDispatchToProps = (dispatch) => ({
  // create new playlist
  event_onNewPlaylistClick: () => {
    dispatch(newPlaylistOpenAction())
  },
  event_onNewPlaylistInputChange: (event) => {
    dispatch(newPlaylistInputChangeAction(event.target.value))
  },
  event_onNewPlaylistDialogClose: (ok) => {
    dispatch(newPlaylistDialogCloseAction(ok))
  },

  // delete current playlist
  event_onDeletePlaylistClick: () => {
    dispatch(deletePlaylistDialogOpenAction())
  },
  event_onDeletePlaylistDialogClose: (ok) => {
    dispatch(deletePlaylistDialogCloseAction(ok))
  },

  // room
  event_onEnterRoomClick: () => {
    dispatch(enterRoomOpenAction())
  },
  event_onLeaveRoomClick: () => {
    dispatch(leaveRoomAction())
  },
  event_onEnterRoomDialogClose: (ok) => {
    dispatch(enterRoomDialogCloseAction(ok))
  },
  event_onEnterRoomInputChange: (event) => {
    dispatch(enterRoomInputChangeAction(event.target.value))
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
