export const urlChangeAction = (url) => ({
  type: 'URL_CHANGE',
  url: url
})

export const artistChangeAction = (artist) => ({
  type: 'ARTIST_CHANGE',
  artist: artist
})

export const titleChangeAction = (title) => ({
  type: 'TITLE_CHANGE',
  title: title
})

export const autoSetInfoAction = (videoId, artist, title) => ({
  type: 'AUTO_SET_INFO',
  videoId: videoId,
  artist: artist,
  title: title
})

export const clearInputAction = () => ({
  type: 'CLEAR_INPUT',
})
