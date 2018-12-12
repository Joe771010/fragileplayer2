import React, {Component} from 'react'
import {connect} from 'react-redux'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import format from 'date-fns/format'

import Account from '../components/Account.js'

import {refreshTableAction} from '../actions/musicTableActions'
import {refreshPlaylistsAction} from '../actions/playlistActions'

class AccountContainer extends Component {

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDsiMCX9o5ht0nvR-2YpydKoc3acvDWxBk",
      authDomain: "fragileplayer2.firebaseapp.com",
      databaseURL: "https://fragileplayer2.firebaseio.com",
      projectId: "fragileplayer2",
      storageBucket: "fragileplayer2.appspot.com",
      messagingSenderId: "616243676456"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if(user.isAnonymous){
        console.log('sign in anonymously')
      }
    })

    this.event_onLoginAccountChange(this.props.loginAccount)
  }

  event_onLoginAccountChange(accountName) {
    this._refreshSongs(accountName)
    this._refreshPlaylists(accountName)
  }

  _refreshSongs(accountName) {
    // get songs from database
    this._count = 0;
    this._firebaseRef = firebase.database().ref('users/' + accountName)
    this._firebaseRef.child('songs').once('value', (dbSongs) => {
      let songs = [];
      this._count = 0;
      dbSongs.forEach((dbSong) => {
        let song = {
          id: this._count,
          videoId: dbSong.val().video_id,
          title: dbSong.val().title,
          artist: dbSong.val().artist,
          createdTime: dbSong.val().createdTime===undefined? '':dbSong.val().createdTime
        }
        songs.push(song);
        this._count = this._count + 1;
      });

      // send action
      this.props.event_onSongsFetch(songs);
      console.log('totally ' + (this._count) + ' songs');
    });
  }

  _refreshPlaylists(accountName) {
    // get playlist names from database
    this.firebaseRef2 = firebase.database().ref('users/' + accountName + '/playlists');
    this.firebaseRef2.once('value', dbPlaylists => {
      let playlists = [];
      dbPlaylists.forEach(dbPlaylist => {
        playlists.push(dbPlaylist.key)
      })

      // send action
      this.props.event_onPlaylistsFetch(playlists)
      console.log('totally ' + (playlists.length) + ' playlists');
    })
  }

  event_addNewSong() {
    const {videoId, title, artist} = this.props;
    // use videoId as key, so we can prevent add repeated songs
    let newSong = {
      [videoId]: {
        title: title,
        artist: artist,
        video_id: videoId,
        createdTime: format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      }
    };
    this.firebaseRef = firebase.database().ref('users/' + this.props.loginAccount + '/songs');
    this.firebaseRef.update(newSong)

    this._refreshSongs(this.props.loginAccount)
  }

  event_finishEditSong(result) {
    if(result === true) {
      let updateSong = {
        [this.props.editSong.videoId]: {
          title: this.props.editSong.title,
          artist: this.props.editSong.artist,
          video_id: this.props.editSong.videoId,
          createdTime: this.props.editSong.createdTime
        }
      };
      this.firebaseRef = firebase.database().ref('users/' + this.props.loginAccount + '/songs');
      this.firebaseRef.update(updateSong);

      this._refreshSongs(this.props.loginAccount)
    }
  }

  event_finishDeleteSong(result) {
    if(result === true){
      let selectedSongs = [];
      this.props.selected.forEach(s => {
        selectedSongs.push(this.props.songs.find((x) => {
          return x.id === s
        }))
      })

      this.firebaseRef = firebase.database().ref('users/' + this.props.loginAccount + '/songs');
      selectedSongs.forEach(s=>{
        this.firebaseRef.child(s.videoId).remove();
      })
      this._refreshSongs(this.props.loginAccount)
    }
  }

  event_onAddSongToPlaylist() {
    let data;
    let selectedSong;
    // add song to room
    if (this.props.currentRoom !== undefined) {
      // current songs in playlist
      data = this.props.playlistSongs.map(song => ({
        title: song.title,
        artist: song.artist,
        videoId: song.videoId,
        owner: song.owner,
      }));
      // selected songs
      this.props.selected.forEach(s => {
        selectedSong = this.props.songs.find(x=>x.id===s);
        data.push({
          title: selectedSong.title,
          artist: selectedSong.artist,
          videoId: selectedSong.videoId,
          owner: this.props.loginAccount,
        })
      })
      this.updateRoom(data, this.props.currentRoom);
      return;
    }

    // add song to playlist (臨時歌單不儲存資料庫)
    if (this.props.currentPlaylist===undefined || this.props.currentPlaylist==='臨時歌單') return;
    // current songs in playlist
    data = this.props.playlistSongs.map(song => ({
      title: song.title,
      artist: song.artist,
      videoId: song.videoId
    }));
    // selected songs
    this.props.selected.forEach(s => {
      selectedSong = this.props.songs.find(x=>x.id===s);
      data.push({
        title: selectedSong.title,
        artist: selectedSong.artist,
        videoId: selectedSong.videoId
      })
    })
    this.updatePlaylist(data, this.props.currentPlaylist)
  }

  event_onPlaylistSongMove(type) {
    let newPlaylistSongs = [...this.props.playlistSongs];
    let idx = this.props.toolMenuIndex;
    let tmp;
    switch (type) {
      case 'MOVE_UP':
        if (idx === 0) return;
        tmp = newPlaylistSongs[idx]
        newPlaylistSongs[idx] = newPlaylistSongs[idx-1]
        newPlaylistSongs[idx-1] = tmp
        break;
      case 'MOVE_DOWN':
        if (idx === newPlaylistSongs.length-1) return;
        tmp = newPlaylistSongs[idx]
        newPlaylistSongs[idx] = newPlaylistSongs[idx+1]
        newPlaylistSongs[idx+1] = tmp
        break;
      case 'DELETE':
        newPlaylistSongs.splice(idx, 1)
        break;
      default:
        return;
    }
    this.updatePlaylist(newPlaylistSongs, this.props.currentPlaylist)
  }

  event_onRoomSongDelete(song, index) {
    if (song.owner !== this.props.loginAccount) {
      alert('not the song owner')
      return;
    }
    let newPlaylistSongs = [...this.props.playlistSongs];
    newPlaylistSongs.splice(index, 1)
    this.updateRoom(newPlaylistSongs, this.props.currentRoom)
  }

  updatePlaylist(songs, playlist) {
    songs = songs.map((song)=>({
      title: song.title,
      artist: song.artist,
      video_id: song.videoId
    }))
    this.firebaseRef = firebase.database().ref('users/' + this.props.loginAccount + '/playlists/' + playlist);
    this.firebaseRef.set(songs);
  }

  updateRoom(songs, room) {
    songs = songs.map((song)=>({
      title: song.title,
      artist: song.artist,
      video_id: song.videoId,
      owner: song.owner,
    }))
    this.firebaseRef = firebase.database().ref('rooms/' + room);
    this.firebaseRef.set(songs);
  }

  event_onDeletePlaylist() {
    this.firebaseRef2 = firebase.database().ref('users/' + this.props.loginAccount + '/playlists');
    this.firebaseRef2.child(this.props.currentPlaylist).remove();
  }


//   render() {
//     return (
//       <div className='app'>
//         <div>
//           <MusicTableToolbarContainer
//             event_onLoginAccountChange={(accountName)=>this.event_onLoginAccountChange(accountName)}
//             event_finishEditSong={(result)=>this.event_finishEditSong(result)}
//             event_finishDeleteSong={(result)=>this.event_finishDeleteSong(result)}
//             event_onAddSongToPlaylist={()=>this.event_onAddSongToPlaylist()}
//           />
//           <MusicTableContainer />
//           <AddNewSongContainer
//             event_addNewSong={()=>this.event_addNewSong()}
//           />
//         </div>
//         <div>
//           <PlaylistToolbarContainer
//             event_onDeletePlaylist={()=>this.event_onDeletePlaylist()}
//           />
//           <PlaylistContainer
//             event_onPlaylistSongMove={(type)=>this.event_onPlaylistSongMove(type)}
//           />
//         </div>
//         <PlayerContainer />
//       </div>
//     )
//   }
// }

  render() {
    return (
      <Account
        currentRoom={this.props.currentRoom}
        event_onLoginAccountChange={(accountName)=>this.event_onLoginAccountChange(accountName)}
        event_finishEditSong={(result)=>this.event_finishEditSong(result)}
        event_finishDeleteSong={(result)=>this.event_finishDeleteSong(result)}
        event_onAddSongToPlaylist={()=>this.event_onAddSongToPlaylist()}
        event_addNewSong={()=>this.event_addNewSong()}
        event_onDeletePlaylist={()=>this.event_onDeletePlaylist()}
        event_onPlaylistSongMove={(type)=>this.event_onPlaylistSongMove(type)}
        event_onRoomSongDelete={(song, index)=>this.event_onRoomSongDelete(song, index)}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  loginAccount: state.accountReducer.loginAccount,

  videoId: state.addNewSongReducer.videoId,
  artist: state.addNewSongReducer.artist,
  title: state.addNewSongReducer.title,

  editSong: state.musicTableToolbarReducer.editSong,
  songs: state.musicTableReducer.songs,
  selected: state.musicTableReducer.selected,

  currentPlaylist: state.playlistReducer.currentPlaylist,
  playlistSongs: state.playlistReducer.playlistSongs,

  currentRoom: state.playlistReducer.currentRoom,

  toolMenuIndex: state.playlistReducer.toolMenuIndex,
})

const mapDispatchToProps = (dispatch) => ({
  event_onSongsFetch: (songs) => {
    dispatch(refreshTableAction(songs));
  },
  event_onPlaylistsFetch: (playlists) => {
    dispatch(refreshPlaylistsAction(playlists))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)
