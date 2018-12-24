import React, {Component} from 'react'
import {connect} from 'react-redux'

import MusicTableToolbar from '../components/MusicTableToolbar.js'
import LoginDialog from '../components/LoginDialog.js'
import EditSongDialog from '../components/EditSongDialog.js'
import DeleteSongDialog from '../components/DeleteSongDialog.js'
import HelpDialog from '../components/HelpDialog.js'

import {loginOpenAction, loginInputChangeAction, loginCloseAction, resetAccountAction} from '../actions/accountActions.js'
import {editSongOpenAction, editSongCloseAction, editSongTitleChangeAction, editSongArtistChangeAction, deleteSongOpenAction, deleteSongCloseAction, helpAction, helpCloseAction} from '../actions/musicTableToolbarActions.js'
import {addSongToPlaylistAction} from '../actions/playlistActions.js'

class MusicTableToolbarContainer extends Component {

  event_onLoginClose(isChangingAccount) {
    if(isChangingAccount && this.props.userNameInput !== '') {
      this.props.event_onLoginAccountChange(this.props.userNameInput)
      this.props.closeLoginDialog(isChangingAccount, this.props.userNameInput)
    } else {
      this.props.closeLoginDialog(false, this.props.userNameInput)
    }

  }

  render() {
    this.selectedSongs = [];
    this.props.selected.forEach(s => {
      this.selectedSongs.push(this.props.songs.find((x) => {
        return x.id === s
      }))
    })
    return (
      <div style={{paddingTop:'10px'}}>
        <MusicTableToolbar
          selected={this.props.selected}
          loginAccount={this.props.loginAccount}
          event_onLoginClick={this.props.event_onLoginClick}
          event_onEditSongClick={()=>this.props.event_onEditSongClick(this.selectedSongs[0])}
          event_onDeleteSongClick={this.props.event_onDeleteSongClick}
          event_onHelpClick={this.props.event_onHelpClick}
          event_onAddSongToPlaylist={()=>{
            this.props.event_onAddSongToPlaylist()
            this.props.send_addSongToPlaylistAction(this.selectedSongs, this.props.loginAccount)
          }}
        />
        <LoginDialog
          userNameInput={this.props.userNameInput}
          displayLoginDialog={this.props.displayLoginDialog}
          event_onLoginInputChange={this.props.event_onLoginInputChange}
          event_onLoginClose={(isChangingAccount)=>this.event_onLoginClose(isChangingAccount)}
        />
        <EditSongDialog
          displayEditSongDialog = {this.props.displayEditSongDialog}
          editSong = {this.props.editSong}
          event_onEditSongClose = {(result)=>{
            this.props.event_finishEditSong(result)
            this.props.event_onEditSongClose()}
          }
          event_onEditSongTitleChange = {this.props.event_onEditSongTitleChange}
          event_onEditSongArtistChange = {this.props.event_onEditSongArtistChange}
        />
        <DeleteSongDialog
          displayDeleteSongDialog = {this.props.displayDeleteSongDialog}
          event_onDeleteSongClose = {(result)=>{
            this.props.event_finishDeleteSong(result)
            this.props.event_onDeleteSongClose()}
          }
        />
        <HelpDialog
          displayHelpDialog = {this.props.displayHelpDialog}
          event_onHelpClose = {this.props.event_onHelpClose}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  songs: state.musicTableReducer.songs,
  selected: state.musicTableReducer.selected,

  displayLoginDialog: state.accountReducer.displayLoginDialog,
  userNameInput: state.accountReducer.userNameInput,
  loginAccount: state.accountReducer.loginAccount,

  displayEditSongDialog: state.musicTableToolbarReducer.displayEditSongDialog,
  displayDeleteSongDialog: state.musicTableToolbarReducer.displayDeleteSongDialog,
  displayHelpDialog: state.musicTableToolbarReducer.displayHelpDialog,
  editSong: state.musicTableToolbarReducer.editSong,

  currentRoom: state.playlistReducer.currentRoom,
})

const mapDispatchToProps = (dispatch) => ({
  // ---------- login ----------
  event_onLoginClick: () => {
    dispatch(loginOpenAction())
  },
  event_onLoginInputChange: (event) => {
    dispatch(loginInputChangeAction(event.target.value))
  },
  closeLoginDialog: (isChangingAccount, userNameInput) => {
    dispatch(loginCloseAction())
    if(isChangingAccount) dispatch(resetAccountAction(userNameInput))
  },
  // ---------- edit song ----------
  event_onEditSongClick: (editSong) => {
    dispatch(editSongOpenAction(editSong))
  },
  event_onEditSongClose: () => {
    dispatch(editSongCloseAction())
  },
  event_onEditSongTitleChange: (event) => {
    dispatch(editSongTitleChangeAction(event.target.value))
  },
  event_onEditSongArtistChange: (event) => {
    dispatch(editSongArtistChangeAction(event.target.value))
  },
  // ---------- delete song ----------
  event_onDeleteSongClick: () => {
    dispatch(deleteSongOpenAction())
  },
  event_onDeleteSongClose: () => {
    dispatch(deleteSongCloseAction())
  },
  // ---------- playlist ----------
  send_addSongToPlaylistAction: (songs, account) => {
    dispatch(addSongToPlaylistAction(songs, account))
  },
  // ---------- help ----------
  event_onHelpClick: () => {
    dispatch(helpAction())
  },
  event_onHelpClose: () => {
    dispatch(helpCloseAction())
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(MusicTableToolbarContainer)
