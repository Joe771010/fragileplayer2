const initialState = () => ({
  songs: [],
  order: 'asc',
  orderBy: 'createdTime',
  selected: [],
  page: 0,
  rowsPerPage: 25,
})

const musicTableReducer  = (state = initialState(), action) => {
  switch (action.type) {
    case 'REFRESH_TABLE':
      return Object.assign({}, state, {
        songs: action.songs
      })
    case 'CHANGE_SORT':
      if(state.orderBy === action.orderBy) {
        return Object.assign({}, state, {
          order: (state.order==='asc')? 'desc':'asc'
        })
      }
      return Object.assign({}, state, {
        order: 'asc',
        orderBy: action.orderBy
      })
    case 'SELECT_SONG':
      if(!state.selected.includes(action.id)) {
        let newSelected = [...state.selected, action.id];
        return Object.assign({}, state, {
          selected: newSelected
        })
      }
      else {
        let newSelected = [...state.selected];
        newSelected.splice(newSelected.indexOf(action.id), 1)
        return Object.assign({}, state, {
          selected: newSelected
        })
      }
    case 'SELECT_ALL':
      if (action.checked) {
        return Object.assign({}, state, {
          selected: state.songs.map(x=>x.id)
        })
      } else {
        return Object.assign({}, state, {
          selected: []
        })
      }
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        page: action.page
      })
    case 'CHANGE_ROWS_PER_PAGE':
      return Object.assign({}, state, {
        rowsPerPage: action.rowsPerPage
      })
    case 'EDIT_SONG_CLOSE':
      return Object.assign({}, state, {
        selected: [],
      })
    case 'DELETE_SONG_CLOSE':
      return Object.assign({}, state, {
        selected: [],
      })
    case 'ADD_SONG_TO_PLAYLIST':
      return Object.assign({}, state, {
        selected: [],
      })
    default:
      return state;
  }
}

export default musicTableReducer
