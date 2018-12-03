const initialState = () => ({
  url: '',
  videoId: '',
  artist: '',
  title: ''
})

const addNewSongReducer  = (state = initialState(), action) => {
  switch (action.type) {
    case 'URL_CHANGE':
      return Object.assign({}, state, {
        url: action.url
      })
    case 'ARTIST_CHANGE':
      return Object.assign({}, state, {
        artist: action.artist
      })
    case 'TITLE_CHANGE':
      return Object.assign({}, state, {
        title: action.title
      })
    case 'AUTO_SET_INFO':
      return Object.assign({}, state, {
        videoId: action.videoId,
        artist: action.artist,
        title: action.title
      })
    case 'CLEAR_INPUT':
        return initialState();
    default:
      return state;
  }
}

export default addNewSongReducer
