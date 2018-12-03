export const refreshTableAction = (songs) => ({
  type: 'REFRESH_TABLE',
  songs: songs
})

export const changeSortAction = (orderBy) => ({
  type: 'CHANGE_SORT',
  orderBy: orderBy
})

export const selectSongAction = (id) => ({
  type: 'SELECT_SONG',
  id: id
})

export const selectAllAction = (checked) => ({
  type: 'SELECT_ALL',
  checked: checked
})

export const changePageAction = (page) => ({
  type: 'CHANGE_PAGE',
  page: page
})

export const changeRowsPerPageAction = (rowsPerPage) => ({
  type: 'CHANGE_ROWS_PER_PAGE',
  rowsPerPage: rowsPerPage
})

export const musicTableDoubleClickAction = (song) => ({
  type: 'PLAY_SONG_FROM_TABLE',
  song: song
})
