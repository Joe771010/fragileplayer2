export const editSongOpenAction = (editSong) => ({
  type: 'EDIT_SONG_INIT',
  editSong: editSong
})

export const editSongCloseAction = () => ({
  type: 'EDIT_SONG_CLOSE',
})

export const editSongTitleChangeAction = (title) => ({
  type: 'EDIT_SONG_TITLE_CHANGE',
  title: title
})

export const editSongArtistChangeAction = (artist) => ({
  type: 'EDIT_SONG_ARTIST_CHANGE',
  artist: artist
})

export const deleteSongOpenAction = () => ({
  type: 'DELETE_SONG_OPEN',
})

export const deleteSongCloseAction = () => ({
  type: 'DELETE_SONG_CLOSE',
})

export const helpAction = () => ({
  type: 'OPEN_HELP_DIALOG',
})

export const helpCloseAction = () => ({
  type: 'CLOSE_HELP_DIALOG',
})
