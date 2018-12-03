import React, {Component} from 'react'
import {connect} from 'react-redux'

import firebase from 'firebase/app';
import 'firebase/database';



import AddNewSong from '../components/AddNewSong.js'

import {urlChangeAction, artistChangeAction, titleChangeAction, autoSetInfoAction, clearInputAction, } from '../actions/addNewSongActions'

// Promise
import Promise from 'promise'
// Youtube parsers
import * as getYoutubeId from 'get-youtube-id';
import * as getYoutubeTitle from 'get-youtube-title';
import * as getArtistTitle from 'get-artist-title';

class AddNewSongContainer extends Component {
  render() {
    const {url, videoId, artist, title} = this.props;
    return (
      <AddNewSong
        url = {url}
        title = {title}
        artist = {artist}
        ready = {videoId!=='' && title!=='' && artist!==''}
        event_urlOnChange = {this.props.event_urlOnChange}
        event_artistOnChange = {this.props.event_artistOnChange}
        event_titleOnChange = {this.props.event_titleOnChange}
        event_addNewSongOnClick = {() => {
          this.props.event_addNewSong()
          this.props.clearInput()
        }}
      />
    );
  }
}

// function to parse youtube url
// encapsulated with a Promise because 'getYoutubeTitle' is asynchronous
const parseYoutubeUrl = (url) => {
  let id = getYoutubeId(url, {fuzzy: false});
  if(id==null) {
    return new Promise((resolve, reject) => {
      reject('Cannot get youtube id');
    })
  }
  else {
    return new Promise((resolve, reject) => {
      getYoutubeTitle(id, (err, fullTitle) => {
        resolve({videoId:id, fullTitle:fullTitle});
        reject(err);
      })
    })
  }
}

const mapStateToProps = (state) => ({
  url: state.addNewSongReducer.url,
  videoId: state.addNewSongReducer.videoId,
  artist: state.addNewSongReducer.artist,
  title: state.addNewSongReducer.title,
  loginAccount: state.accountReducer.loginAccount,
})

const mapDispatchToProps = (dispatch) => ({
  event_urlOnChange: (event) => {
    dispatch(urlChangeAction(event.target.value))
    parseYoutubeUrl(event.target.value).then((value) => {
      try {
        console.log('video id = ' + value.videoId);
        let [artist, title] = getArtistTitle(value.fullTitle);
        dispatch(autoSetInfoAction(value.videoId, artist, title));
      } catch (e) {
        console.log(e);
        dispatch(autoSetInfoAction(value.videoId, 'unknown artist', 'unknown title'));
      }
    }).catch((error) => {
      console.log(error);
      dispatch(autoSetInfoAction('', '', ''));
    })
  },
  event_artistOnChange: (event) => {
    dispatch(artistChangeAction(event.target.value))
  },
  event_titleOnChange: (event) => {
    dispatch(titleChangeAction(event.target.value))
  },
  clearInput: () => {
    dispatch(clearInputAction())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSongContainer)
