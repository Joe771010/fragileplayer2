import React, {Component} from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Delete from '@material-ui/icons/Delete';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/playlistStyle.js'

class Playlist extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Paper>
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
                className={classes.text}
                disableTypography
                primary={song.title+' - '+song.artist}
              />
              <IconButton onClick={(event)=>this.props.event_onToolMenuClick(event, index)}>
                <MoreHoriz className={classes.iconSmall} color='primary'/>
              </IconButton>
              <Popover
                open={Boolean(this.props.toolMenuAnchor)}
                anchorEl={this.props.toolMenuAnchor}
                onClose={this.props.event_onToolMenuClose}
              >
                <MenuList>
                  <MenuItem><ArrowUpward className={classes.iconLarge} onClick={this.props.event_onMoveUp}/></MenuItem>
                  <MenuItem><ArrowDownward className={classes.iconLarge} onClick={this.props.event_onMoveDown}/></MenuItem>
                  <MenuItem><Delete className={classes.iconLarge} color='secondary' onClick={this.props.event_onDelete}/></MenuItem>
                </MenuList>
            </Popover>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(Playlist)
