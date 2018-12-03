import React, {Component} from 'react'

import Toolbar from '@material-ui/core/Toolbar';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/musicTableToolbarStyle.js'

class MusicTableToolbar extends Component {
  render() {
    const { classes } = this.props;
    const numSelected = this.props.selected.length;
    const accountText = (this.props.loginAccount !== '' && this.props.loginAccount !== undefined)? this.props.loginAccount:'Login here';

    return (
      <Toolbar>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Button
              className={classes.button}
              color='primary'
              onClick={this.props.event_onLoginClick}
            >
              <AccountCircle className={classes.accountCircle}/>
              {accountText}
            </Button>
          </Grid>
          <Grid item xs={6} container spacing={0}>
            <Grid item>
              <Button color='primary' disabled={numSelected!==1} onClick={this.props.event_onEditSongClick}>
                <EditIcon/>
              </Button>
            </Grid>
            <Grid item>
              <Button color='primary' disabled={numSelected===0} onClick={this.props.event_onDeleteSongClick}>
                <DeleteIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button color='primary' disabled={numSelected===0} onClick={this.props.event_onAddSongToPlaylist}>
                <PlaylistAdd />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    )
  }
}

export default withStyles(styles)(MusicTableToolbar)
