import React, {Component} from 'react'
import {connect} from 'react-redux'

import Player from '../components/Player.js'

import YouTube from 'react-youtube';

import {setYoutubeApiAction, changePlayModeAction, changeYoutubeStateAction, changeVolumeAction, changeTimeAction, changeSongAction} from '../actions/playerActions'

class PlayerContainer extends Component {
  componentDidMount() {
    // 讓歌曲進度的slider能夠自動捲動, 每2000ms去更新一次state
    this.interval = setInterval(() => {
      this.autoSliding();
    }, 2000)
  }

  // 歌曲進度的slider能夠自動捲動的function
  autoSliding() {
    // api call
    let t = this.props.youtube? this.props.youtube.getCurrentTime(): 0
    // send action
    this.props.changeTime(t)
  }

  event_onReady(event) {
    // api call
    if(event.target.isMuted) event.target.unMute()
    event.target.setVolume(this.props.volume);
    event.target.setPlaybackQuality('medium')
    // send action
    this.props.setYoutubeApi(event.target)
  }

  event_onStateChange(event) {
    const {playlistSongs, currentSongIndex, song, playMode} = this.props;

    let youtubeState = event.target.getPlayerState()
    // console.log('event_onStateChange: ' + youtubeState);

    // empty playlist
    if (youtubeState===0 && currentSongIndex>=playlistSongs.length) {
      this.props.changeYoutubeState(youtubeState);
      return;
    }

    // 依序播放模式
    let index = currentSongIndex;
    if (youtubeState === 0 && playMode === 1) {
      // special situation (if playlist were modified)
      if (playlistSongs[index].videoId !== song.videoId) {
        index = playlistSongs.findIndex(s => s.videoId === song.videoId);
      }
      if (index !== playlistSongs.length-1) {
        this.props.changeSong(playlistSongs[index+1], index+1)
      }
    }

    // 單曲循環播放模式
    if (youtubeState === 0 && playMode === 2) {
      this.props.youtube.playVideo();
    }

    // 隨機播放模式
    if (youtubeState === 0 && playMode === 3) {
      let nextIndex = Math.floor((Math.random() * playlistSongs.length))
      if (nextIndex === currentSongIndex)  this.props.youtube.playVideo();
      else this.props.changeSong(playlistSongs[nextIndex], nextIndex)
    }

    // send action
    this.props.changeYoutubeState(youtubeState)
  }


  event_onPlayClick() {
    switch(this.props.youtubeState) {
      case 0:
        this.props.youtube.playVideo();
        break;
      case 1:
        this.props.youtube.pauseVideo();
        break;
      case 2:
        this.props.youtube.playVideo();
        break;
      case 5:
        this.props.youtube.playVideo();
        break;
      default:
        return;
    }
  }

  event_onNextClick() {
    const {playlistSongs, currentSongIndex, playMode} = this.props;
    if (currentSongIndex >= playlistSongs.length) return;

    // 依序播放模式, 單曲循環播放模式
    if (playMode < 3 && currentSongIndex !== playlistSongs.length-1) {
      this.props.changeSong(playlistSongs[currentSongIndex+1], currentSongIndex+1)
    }

    // 隨機播放模式
    if (playMode === 3) {
      let nextIndex = Math.floor((Math.random() * playlistSongs.length))
      if (nextIndex === currentSongIndex)  this.props.youtube.playVideo();
      else this.props.changeSong(playlistSongs[nextIndex], nextIndex)
    }
  }

  event_onPrevClick() {
    const {playlistSongs, currentSongIndex, playMode} = this.props;
    if (currentSongIndex >= playlistSongs.length) return;

    // 依序播放模式, 單曲循環播放模式
    if (playMode < 3 && currentSongIndex !== 0) {
      this.props.changeSong(playlistSongs[currentSongIndex-1], currentSongIndex-1)
    }

    // 隨機播放模式
    if (playMode === 3) {
      let nextIndex = Math.floor((Math.random() * playlistSongs.length))
      if (nextIndex === currentSongIndex)  this.props.youtube.playVideo();
      else this.props.changeSong(playlistSongs[nextIndex], nextIndex)
    }
  }

  // change the volume slider
  event_onVolumeChange(event, volume) {
    // api call
    if(this.props.youtube.isMuted) this.props.youtube.unMute()
    this.props.youtube.setVolume(volume);
    // send action
    this.props.changeVolume(volume)
  }

  // change the song slider
  event_onTimeChange(event, value) {
    // stop autoSliding
    clearInterval(this.interval)
    // send action
    this.props.changeTime(value)
    //this.autoSliding()
    // api call
    switch(this.props.youtubeState) {
      case 1:
        this.props.youtube.seekTo(value, true);
        break;
      case 2:
        this.props.youtube.seekTo(value, true);
        break;
      case 5:
        this.props.youtube.seekTo(value, true);
        this.props.youtube.playVideo();
        break;
      default:
        return
    }
    // restart autoSliding
    this.interval = setInterval(() => {
      this.autoSliding();
    }, 2000)
  }

  render() {
    const opts = {
      height: '0',
      width: '0',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }
    };

    let duration = this.props.youtube? this.props.youtube.getDuration(): 0;

    return (
      <div style={{height:'100%'}}>
        <Player
          song={this.props.song}
          playMode={this.props.playMode}
          youtubeState={this.props.youtubeState}
          volume={this.props.volume}
          currentTime={this.props.currentTime}
          duration={duration}
          event_onPlayModeChange={this.props.event_onPlayModeChange}
          event_onPlayClick={()=>this.event_onPlayClick()}
          event_onNextClick={()=>this.event_onNextClick()}
          event_onPrevClick={()=>this.event_onPrevClick()}
          event_onVolumeChange={(event, value)=>this.event_onVolumeChange(event, value)}
          event_onTimeChange={(event, value)=>this.event_onTimeChange(event, value)}
        />
        <YouTube
          opts={opts}
          videoId={this.props.song.videoId}
          onReady={(event)=>this.event_onReady(event)}
          onStateChange={(event)=>this.event_onStateChange(event)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  song: state.playerReducer.song,
  youtube: state.playerReducer.youtube,
  youtubeState: state.playerReducer.youtubeState,
  playMode: state.playerReducer.playMode,
  volume: state.playerReducer.volume,
  currentTime: state.playerReducer.currentTime,

  playlistSongs: state.playlistReducer.playlistSongs,
  currentSongIndex: state.playlistReducer.currentSongIndex,
})

const mapDispatchToProps = (dispatch) => ({
  setYoutubeApi: (youtube) => {
    dispatch(setYoutubeApiAction(youtube))
  },
  changeYoutubeState: (youtubeState) => {
    dispatch(changeYoutubeStateAction(youtubeState))
  },
  changeVolume: (volume) => {
    dispatch(changeVolumeAction(volume))
  },
  changeTime: (time) => {
    dispatch(changeTimeAction(time))
  },
  changeSong: (song, index) => {
    dispatch(changeSongAction(song, index))
  },
  event_onPlayModeChange: (event) => {
    dispatch(changePlayModeAction(event.target.value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
