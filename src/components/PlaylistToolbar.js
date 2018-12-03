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
    // return (
    //   <Toolbar>
    //     <Select
    //       value={this.props.currentPlaylist===undefined? '':this.props.currentPlaylist}
    //       onChange={this.props.event_onPlaylistChange}
    //     >
    //       {this.props.playlists.map((list, index) => {
    //         return (
    //           <MenuItem value={list} key={index}>
    //             {list}
    //           </MenuItem>
    //         )
    //       })}
    //     </Select>
    //     <Button onClick={this.props.event_onNewPlaylistClick}>
    //       New
    //     </Button>
    //     <Button onClick={this.props.event_onDeletePlaylistClick}>
    //       Delete
    //     </Button>
    //   </Toolbar>
    // );

    return (
      <Toolbar>
        <Grid container spacing={0} >
          <Grid item xs={5} >
            <Select
              className={classes.select}
              fullWidth
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
            <Button fullWidth color='secondary' onClick={this.props.event_onNewPlaylistClick}>
              New
            </Button>
          </Grid>
          <Grid item xs={2} >
            <Button fullWidth color='primary' onClick={this.props.event_onDeletePlaylistClick}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    );
  }
}

const styles = theme => ({
  border1: {
    borderColor: '#1DE9B6',
    borderStyle: 'dashed'
  },
  border2: {
    borderColor: '#00E5FF',
    borderStyle: 'dashed',
  },
  select: {
    fontFamily: 'Verdana',
  },
  menuItem: {
    fontFamily: 'Verdana',
  },
  border3: {
    borderColor: '#EC407A',
    borderStyle: 'dashed'
  },
  border4: {
    borderColor: '#FF9800',
    borderStyle: 'dashed'
  }
})

export default withStyles(styles)(PlaylistToolbar)
