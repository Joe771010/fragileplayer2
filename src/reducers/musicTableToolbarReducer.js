const initialState = () => ({
  editSong: {},
  displayEditSongDialog: false,
  displayDeleteSongDialog: false,
  displayHelpDialog: false,
})

const musicTableToolbarReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'EDIT_SONG_INIT':
      return Object.assign({}, state, {
        editSong: action.editSong,
        displayEditSongDialog: true
      })
    case 'EDIT_SONG_CLOSE':
      return Object.assign({}, state, {
        editSong: {},
        displayEditSongDialog: false,
      })
    case 'EDIT_SONG_TITLE_CHANGE':
      return Object.assign({}, state, {
        editSong: Object.assign({}, state.editSong, {
          title: action.title
        })
      })
    case 'EDIT_SONG_ARTIST_CHANGE':
      return Object.assign({}, state, {
        editSong: Object.assign({}, state.editSong, {
          artist: action.artist
        })
      })
    case 'DELETE_SONG_OPEN':
      return Object.assign({}, state, {
        displayDeleteSongDialog: true,
      })
    case 'DELETE_SONG_CLOSE':
      return Object.assign({}, state, {
        displayDeleteSongDialog: false,
      })
    case 'OPEN_HELP_DIALOG':
      return Object.assign({}, state, {
        displayHelpDialog: true,
      })
    case 'CLOSE_HELP_DIALOG':
      return Object.assign({}, state, {
        displayHelpDialog: false,
      })
    default:
      return state;
  }
}

export default musicTableToolbarReducer
