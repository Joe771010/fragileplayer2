import React, {Component} from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/playlistStyle.js'

class Room extends Component {

  getContent(song) {
    const {classes} = this.props;
    let hidedOwner = '';
    if (song.owner!==undefined) {
      hidedOwner = '*'.repeat(song.owner.length);
      if (song.owner.length>2) {
        hidedOwner = song.owner.charAt(0)+'*'.repeat(song.owner.length-2)+song.owner.charAt(song.owner.length-1)
      }
    }
    
    return (
      <div>
        <span className={classes.text}>
          {song.title + ' - ' + song.artist}
        </span>
        <span className={classes.textOwner}>
          #{hidedOwner}
        </span>
      </div>
    )
  }

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.background}>
        <List className={classes.list}>
          {this.props.playlistSongs.map((song,index) => (
            <ListItem
              key={index}
              selected={this.props.currentSongIndex===index}
              dense
              divider
              onDoubleClick={()=>this.props.event_onDoubleClick(song, index)}
            >
              <ListItemText
                disableTypography
              >
                {this.getContent(song)}
              </ListItemText>
              <IconButton onClick={()=>this.props.event_onRoomSongDelete(song, index)}>
                <Delete className={classes.iconLarge} />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <div align='right' className={classes.autoRefresh}>auto refresh every 30 seconds</div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Room)
