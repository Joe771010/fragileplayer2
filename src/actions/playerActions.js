export const setYoutubeApiAction = (youtube) => ({
  type: 'SET_YOUTUBE_API',
  youtube: youtube
})

export const changePlayModeAction = (mode) => ({
  type: 'CHANGE_PLAY_MODE',
  mode: mode
})

export const changeYoutubeStateAction = (youtubeState) => ({
  type: 'CHANGE_YOUTUBE_STATE',
  youtubeState: youtubeState
})

export const changeVolumeAction = (volume) => ({
  type: 'CHANGE_VOLUME',
  volume: volume
})

export const changeTimeAction = (time) => ({
  type: 'CHANGE_TIME',
  time: time
})

export const changeSongAction = (song, index) => ({
  type: 'CHANGE_SONG',
  song: song,
  index: index
})
