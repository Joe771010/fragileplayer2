const initialState = () => ({
    // player
    youtube: null,
    song: {
      videoId: '',
      title: '',
      artist: ''
    },
    youtubeState: -1,
    currentTime: 0,
    playMode: 1,
    volume: 20,
})

const playerReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'SET_YOUTUBE_API':
      return Object.assign({}, state, {
        youtube: action.youtube
      })
    case 'CHANGE_PLAY_MODE':
      console.log('CHANGE_PLAY_MODE -> ' + action.mode);
      return Object.assign({}, state, {
        playMode: action.mode,
      })
    case 'CHANGE_YOUTUBE_STATE':
      return Object.assign({}, state, {
        youtubeState: action.youtubeState,
      })
    case 'PLAY_SONG_FROM_PLAYLIST':
      return Object.assign({}, state, {
        song: action.song,
      })
    case 'PLAY_SONG_FROM_TABLE':
      return Object.assign({}, state, {
        song: action.song,
      })
    case 'CHANGE_VOLUME':
      return Object.assign({}, state, {
        volume: action.volume,
      })
    case 'CHANGE_TIME':
      return Object.assign({}, state, {
        currentTime: action.time,
      })
    case 'CHANGE_SONG':
      return Object.assign({}, state, {
        song: action.song,
      })
    default:
      return state
  }
}

export default playerReducer
