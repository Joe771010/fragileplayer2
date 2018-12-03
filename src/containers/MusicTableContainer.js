import React, {Component} from 'react'
import {connect} from 'react-redux'

import MusicTable from '../components/MusicTable.js'

import {refreshTableAction, changeSortAction, selectSongAction, selectAllAction, changePageAction, changeRowsPerPageAction, musicTableDoubleClickAction} from '../actions/musicTableActions'

import naturalCompare from 'string-natural-compare'

class MusicTableContainer extends Component {

  sortSongs() {
    this.props.songs.sort((a,b) => {
      if(this.props.orderBy === 'title') {
        return this.props.order==='asc'? naturalCompare.caseInsensitive(a.title, b.title):-naturalCompare.caseInsensitive(a.title, b.title);
      } else if (this.props.orderBy === 'artist') {
        return this.props.order==='asc'? naturalCompare.caseInsensitive(a.artist, b.artist):-naturalCompare.caseInsensitive(a.artist, b.artist);
      } else {
        return -naturalCompare.caseInsensitive(a.createdTime, b.createdTime);
      }
    })
  }

  render() {
    this.sortSongs();
    return (
      <MusicTable
        order = {this.props.order}
        orderBy = {this.props.orderBy}
        songs = {this.props.songs}
        selected = {this.props.selected}
        page = {this.props.page}
        rowsPerPage = {this.props.rowsPerPage}
        event_onSortLabelClick = {this.props.event_onSortLabelClick}
        event_onSelect = {this.props.event_onSelect}
        event_onSelectAll = {this.props.event_onSelectAll}
        event_onChangePage = {this.props.event_onChangePage}
        event_onChangeRowsPerPage = {this.props.event_onChangeRowsPerPage}
        event_onDoubleClick={this.props.event_onDoubleClick}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  loginAccount: state.accountReducer.loginAccount,
  songs: state.musicTableReducer.songs,
  order: state.musicTableReducer.order,
  orderBy: state.musicTableReducer.orderBy,
  selected: state.musicTableReducer.selected,
  page: state.musicTableReducer.page,
  rowsPerPage: state.musicTableReducer.rowsPerPage,
})

const mapDispatchToProps = (dispatch) => ({
  event_onDatabaseCreate: (data) => {
    dispatch(refreshTableAction(data));
  },
  event_onSortLabelClick: (orderBy) => {
    dispatch(changeSortAction(orderBy))
  },
  event_onSelect: (event, id) => {
    dispatch(selectSongAction(id))
  },
  event_onSelectAll: (event) => {
    dispatch(selectAllAction(event.target.checked))
  },
  event_onChangePage: (event, page) => {
    dispatch(changePageAction(page))
  },
  event_onChangeRowsPerPage: (event) => {
    dispatch(changeRowsPerPageAction(event.target.value))
  },
  event_onDoubleClick: (song) => {
    dispatch(musicTableDoubleClickAction(song))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicTableContainer)
