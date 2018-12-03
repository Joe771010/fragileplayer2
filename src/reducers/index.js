import { combineReducers } from 'redux'

import addNewSongReducer from './addNewSongReducer.js'
import musicTableReducer from './musicTableReducer.js'
import musicTableToolbarReducer from './musicTableToolbarReducer.js'
import accountReducer from './accountReducer.js'
import playlistReducer from './playlistReducer.js'
import playerReducer from './playerReducer.js'


const rootReducer = combineReducers({
  accountReducer,
  addNewSongReducer,
  musicTableReducer,
  musicTableToolbarReducer,
  playlistReducer,
  playerReducer,
});

export default rootReducer
