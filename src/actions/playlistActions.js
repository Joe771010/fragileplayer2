export const addSongToPlaylistAction = (songs, account) => ({
  type: 'ADD_SONG_TO_PLAYLIST',
  songs: songs,
  account: account
})

export const newPlaylistOpenAction = () => ({
  type: 'NEW_PLAYLIST_OPEN'
})

export const newPlaylistDialogCloseAction = (success) => ({
  type: 'NEW_PLAYLIST_DIALOG_CLOSE',
  success: success
})

export const newPlaylistInputChangeAction = (name) => ({
  type: 'NEW_PLAYLIST_INPUT_CHANGE',
  name: name
})

export const deletePlaylistDialogOpenAction = () => ({
  type: 'DELETE_PLAYLIST_DIALOG_OPEN'
})

export const deletePlaylistDialogCloseAction = (ok) => ({
  type: 'DELETE_PLAYLIST_DIALOG_CLOSE',
  ok: ok
})

export const enterRoomOpenAction = () => ({
  type: 'ENTER_ROOM_OPEN'
})

export const leaveRoomAction = () => ({
  type: 'LEAVE_ROOM',
})

export const enterRoomDialogCloseAction = (ok) => ({
  type: 'ENTER_ROOM_DIALOG_CLOSE',
  ok: ok
})

export const enterRoomInputChangeAction = (name) => ({
  type: 'ENTER_ROOM_INPUT_CHANGE',
  name: name
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

export const roomSongDeleteAction = (index) => ({
  type: 'ROOM_SONG_DELETE',
  index: index
})
