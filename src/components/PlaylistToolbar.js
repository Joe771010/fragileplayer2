import React, {Component} from 'react'

import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

class PlaylistToolbar extends Component {
  render() {
    const {classes} = this.props;
    const roomString = this.props.currentRoom===undefined? 'Enter Room': ('Leave '+ this.props.currentRoom);
    const disableTools = this.props.currentRoom!==undefined;

    return (
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={0} >
          <Grid item xs={4} >
            <Select
              className={classes.select}
              fullWidth
              disabled={disableTools}
              value={this.props.currentPlaylist===undefined? '':this.props.currentPlaylist}
              onChange={this.props.event_onPlaylistChange}
            >
              {this.props.playlists.map((list, index) => {
                return (
                  <MenuItem className={classes.menuItem} value={list} key={index}>
                    {list}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={2} >
            <Button disabled={disableTools} fullWidth color='secondary' onClick={this.props.event_onNewPlaylistClick}>
              New
            </Button>
          </Grid>
          <Grid item xs={2} >
            <Button disabled={disableTools} fullWidth color='primary' onClick={this.props.event_onDeletePlaylistClick}>
              Delete
            </Button>
          </Grid>
          <Grid item xs={4} >
            <Button className={classes.roomButton} fullWidth onClick={this.props.event_onEnterLeaveRoomClick}>
              {roomString}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    );
  }
}

const styles = theme => ({
  select: {
    fontFamily: 'Verdana',
  },
  menuItem: {
    fontFamily: 'Verdana',
  },
  roomButton: {
    //fontFamily: 'Verdana',
    textTransform:'none',
  },
  toolbar: {
    backgroundColor: '#424242',
    borderRadius: '5px',
  }
})

export default withStyles(styles)(PlaylistToolbar)
