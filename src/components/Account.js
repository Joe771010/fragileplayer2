import React, {Component} from 'react'

import PlaylistToolbarContainer from '../containers/PlaylistToolbarContainer.js'
import PlaylistContainer from '../containers/PlaylistContainer.js'
import PlayerContainer from '../containers/PlayerContainer.js'
import RoomContainer from '../containers/RoomContainer.js'

import AddNewSongContainer from '../containers/AddNewSongContainer.js'
import MusicTableContainer from '../containers/MusicTableContainer.js'
import MusicTableToolbarContainer from '../containers/MusicTableToolbarContainer.js'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

class Account extends Component {
  render() {
    const {classes} = this.props;
    const playlist = (
      <PlaylistContainer
        event_onPlaylistSongMove={this.props.event_onPlaylistSongMove}
      />
    );
    const room = (
      <RoomContainer
        event_onRoomSongDelete={this.props.event_onRoomSongDelete}
      />
    );

    return (
      <Grid container spacing={8} className={classes.main}>

        <Grid item container spacing={8}>
          <Grid item xs={7} className={classes.musicTableToolbarBorder}>
            <MusicTableToolbarContainer
              event_onLoginAccountChange={this.props.event_onLoginAccountChange}
              event_finishEditSong={this.props.event_finishEditSong}
              event_finishDeleteSong={this.props.event_finishDeleteSong}
              event_onAddSongToPlaylist={this.props.event_onAddSongToPlaylist}
            />
          </Grid>
          <Grid item xs={5} className={classes.playlistToolbarBorder}>
            <PlaylistToolbarContainer
              event_onDeletePlaylist={this.props.event_onDeletePlaylist}
            />
          </Grid>
        </Grid>

        <Grid item container spacing={8}>
          <Grid item xs={7} className={classes.musicTableBorder}>
            <MusicTableContainer />
          </Grid>
          <Grid item xs={5} className={classes.playlistBorder}>
            {this.props.currentRoom===undefined? playlist: room}
          </Grid>
        </Grid>

        <Grid item container spacing={8}>
          <Grid item xs={7} className={classes.addNewSongBorder}>
            <AddNewSongContainer
              event_addNewSong={this.props.event_addNewSong}
            />
          </Grid>
          <Grid item xs={5} className={classes.playerBorder}>
            <PlayerContainer />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  main: {
    maxWidth: '1200px',
  },
  musicTableToolbarBorder: {
    // borderWidth: '1px',
    // borderColor: '#FFCDD2',
    // borderStyle: 'dashed',
    // backgroundColor: '#424242',
    // borderRadius: '5px',
  },
  playlistToolbarBorder: {
    // borderWidth: '1px',
    // borderColor: '#1DE9B6',
    // borderStyle: 'dashed',
    // backgroundColor: '#424242',
    // borderRadius: '5px',
  },
  musicTableBorder: {
    // borderWidth: '1px',
    // borderColor: '#D50000',
    // borderStyle: 'dashed',
  },
  addNewSongBorder: {
    // borderWidth: '1px',
    // borderColor: '#B388FF',
    // borderStyle: 'dashed',
    // backgroundColor: '#424242',
    // background: 'linear-gradient(to bottom, #424242, #313131)',
    // borderRadius: '5px',
  },
  playlistBorder: {
    // borderWidth: '1px',
    // borderColor: '#424242',
    // borderStyle: 'dashed',
  },
  playerBorder: {
    // borderWidth: '1px',
    // borderColor: '#FFD600',
    // borderStyle: 'dashed',
    // backgroundColor: '#424242',
    // borderRadius: '5px',
  }
});

export default withStyles(styles)(Account)
