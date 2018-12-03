export const addSongToPlaylistAction = (songs) => ({
  type: 'ADD_SONG_TO_PLAYLIST',
  songs: songs
})

export const newPlaylistOpenAction = () => ({
  type: 'NEW_PLAYLIST_OPEN'
})

export const newPlaylistCloseAction = (success) => ({
  type: 'NEW_PLAYLIST_CLOSE',
  success: success
})

export const newPlaylistChangeAction = (name) => ({
  type: 'NEW_PLAYLIST_CHANGE',
  name: name
})

export const deletePlaylistOpenAction = () => ({
  type: 'DELETE_PLAYLIST_OPEN'
})

export const deletePlaylistCloseAction = (ok) => ({
  type: 'DELETE_PLAYLIST_CLOSE',
  ok: ok
})

export const refreshPlaylistsAction = (playlists) => ({
  type: 'REFRESH_PLAYLISTS',
  playlists: playlists
})

export const playlistChangeAction = (playlist, songs) => ({
  type: 'PLAYLIST_CHANGE',
  playlist: playlist,
  songs: songs
})

export const playlistDoubleClickAction = (song, index) => ({
  type: 'PLAY_SONG_FROM_PLAYLIST',
  song: song,
  index: index
})

export const playlistToolMenuClickAction = (anchor, index) => ({
  type: 'PLAYLIST_TOOL_MENU_OPEN',
  anchor: anchor,
  index: index
})

export const playlistToolMenuCoseAction = () => ({
  type: 'PLAYLIST_TOOL_MENU_CLOSE',
})

export const playlistSongMoveUpAction = () => ({
  type: 'PLAYLIST_SONG_MOVE_UP',
})

export const playlistSongMoveDownAction = () => ({
  type: 'PLAYLIST_SONG_MOVE_DOWN',
})

export const playlistSongDeleteAction = () => ({
  type: 'PLAYLIST_SONG_DELETE',
})
