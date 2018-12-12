const initialState = () => ({
  // all saved playlists of the account
  playlists: [],

  // current playlist and song
  currentPlaylist: undefined,
  currentSongIndex: 0,
  playlistSongs: [],

  // dialog for creating new playlist
  displayNewPlaylistDialog: false,
  newPlaylist: '',

  // dialog for removing playlist
  displayDeletePlaylistDialog: false,

  // dialog for entering room
  displayEnterRoomDialog: false,
  enterRoomName: '',

  // room
  currentRoom: undefined,

  // menu for song moving and deleting
  toolMenuAnchor: null,
  toolMenuIndex: undefined,
})

const CONST_TEMP_PLAYLIST = '臨時歌單';

const playlistReducer = (state = initialState(), action) => {
  let newPlaylistSongs;
  let tmp;

  switch (action.type) {
    case 'ADD_SONG_TO_PLAYLIST':
      let newSongsArray = action.songs.map(song=>({
        videoId: song.videoId,
        title: song.title,
        artist: song.artist,
        owner: action.account,
      }));
      if (state.currentPlaylist === undefined) {
        return Object.assign({}, state, {
          currentPlaylist: state.currentPlaylist === undefined? CONST_TEMP_PLAYLIST: state.currentPlaylist,
          playlists: [...state.playlists, CONST_TEMP_PLAYLIST],
          playlistSongs: newSongsArray
        })
      }
      return Object.assign({}, state, {
        playlistSongs: [...state.playlistSongs, ...newSongsArray]
      })
    case 'PLAY_SONG_FROM_PLAYLIST':
      return Object.assign({}, state, {
        currentSongIndex: action.index,
      })
    case 'CHANGE_SONG':
      return Object.assign({}, state, {
        currentSongIndex: action.index,
      })
    case 'NEW_PLAYLIST_OPEN':
      return Object.assign({}, state, {
        displayNewPlaylistDialog: true,
      })
    case 'NEW_PLAYLIST_DIALOG_CLOSE':
      return Object.assign({}, state, {
        displayNewPlaylistDialog: false,
        newPlaylist: '',
        currentPlaylist: action.success? state.newPlaylist: state.currentPlaylist,
        playlists: action.success? [...state.playlists, state.newPlaylist]: state.playlists,
        playlistSongs: action.success? []:state.playlistSongs
      })
    case 'NEW_PLAYLIST_INPUT_CHANGE':
      return Object.assign({}, state, {
        newPlaylist: action.name
      })
    case 'DELETE_PLAYLIST_DIALOG_OPEN':
      if (state.currentPlaylist === undefined) return state
      return Object.assign({}, state, {
        displayDeletePlaylistDialog: true,
      })
    case 'DELETE_PLAYLIST_DIALOG_CLOSE':
      return Object.assign({}, state, {
        displayDeletePlaylistDialog: false,
        currentPlaylist: action.ok? undefined: state.currentPlaylist,
        playlists: action.ok? state.playlists.filter(x=>x!==state.currentPlaylist): state.playlists,
        playlistSongs: action.ok? []:state.playlistSongs
      })
    case 'REFRESH_PLAYLISTS':
      return Object.assign({}, state, {
        playlists: action.playlists,
        playlistSongs: [],
        currentPlaylist: undefined,
        currentRoom: undefined,
      })
    case 'PLAYLIST_CHANGE':
      return Object.assign({}, state, {
        currentPlaylist: action.playlist,
        playlistSongs: action.songs
      })
    case 'PLAYLIST_TOOL_MENU_OPEN':
      return Object.assign({}, state, {
        toolMenuAnchor: action.anchor,
        toolMenuIndex: action.index
      })
    case 'PLAYLIST_TOOL_MENU_CLOSE':
      return Object.assign({}, state, {
        toolMenuAnchor: null,
        toolMenuIndex: undefined
      })
    case 'PLAYLIST_SONG_MOVE_UP':
      let idx_up = state.toolMenuIndex;
      if (idx_up === 0) {
        return Object.assign({}, state, {
          toolMenuAnchor: null,
          toolMenuIndex: undefined
        })
      }
      newPlaylistSongs = [...state.playlistSongs]
      tmp = newPlaylistSongs[idx_up]
      newPlaylistSongs[idx_up] = newPlaylistSongs[idx_up-1]
      newPlaylistSongs[idx_up-1] = tmp
      return Object.assign({}, state, {
        playlistSongs: newPlaylistSongs,
        toolMenuAnchor: null,
        toolMenuIndex: undefined
      })
    case 'PLAYLIST_SONG_MOVE_DOWN':
      let idx_down = state.toolMenuIndex;
      if (idx_down === state.playlistSongs.length-1) {
        return Object.assign({}, state, {
          toolMenuAnchor: null,
          toolMenuIndex: undefined
        })
      }
      newPlaylistSongs = [...state.playlistSongs]
      tmp = newPlaylistSongs[idx_down]
      newPlaylistSongs[idx_down] = newPlaylistSongs[idx_down+1]
      newPlaylistSongs[idx_down+1] = tmp
      return Object.assign({}, state, {
        playlistSongs: newPlaylistSongs,
        toolMenuAnchor: null,
        toolMenuIndex: undefined
      })
    case 'PLAYLIST_SONG_DELETE':
      newPlaylistSongs = [...state.playlistSongs]
      newPlaylistSongs.splice(state.toolMenuIndex, 1)
      return Object.assign({}, state, {
        playlistSongs: newPlaylistSongs,
        toolMenuAnchor: null,
        toolMenuIndex: undefined
      })
    case 'ENTER_ROOM_OPEN':
      return Object.assign({}, state, {
        displayEnterRoomDialog: true,
      })
    case 'ENTER_ROOM_DIALOG_CLOSE':
      return Object.assign({}, state, {
        displayEnterRoomDialog: false,
        currentRoom: action.ok? state.enterRoomName: state.currentRoom,
        currentPlaylist: action.ok? undefined: state.currentPlaylist,
      })
    case 'ENTER_ROOM_INPUT_CHANGE':
      return Object.assign({}, state, {
        enterRoomName: action.name
      })
    case 'LEAVE_ROOM':
      return Object.assign({}, state, {
        currentRoom: undefined,
        currentPlaylist: undefined,
        currentSongIndex: 0,
        playlistSongs: [],
      })
    case 'ROOM_SONG_DELETE':
      newPlaylistSongs = [...state.playlistSongs]
      newPlaylistSongs.splice(action.index, 1)
      return Object.assign({}, state, {
        playlistSongs: newPlaylistSongs,
      })
    default:
      return state
  }
}

export default playlistReducer
