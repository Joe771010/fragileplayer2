import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class LayoutTest extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={8}>

        <Grid item container spacing={8}>
          <Grid item xs={7}>
            <Paper className={classes.musicTableToolbar}>MusicTableToolbar</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.playlistToolbar}>PlaylistToolbar</Paper>
          </Grid>
        </Grid>

        <Grid item container spacing={8}>
          <Grid item xs={7} container spacing={0} direction='column'>
            <Grid item>
              <Paper className={classes.musicTable}>MusicTable</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.addNewSong}>AddNewSong</Paper>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.playlist}>Playlist</Paper>
          </Grid>
        </Grid>

        <Grid item container spacing={8}>
          <Grid item xs={7}>
            <Paper className={classes.player}>Player</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.logo}>Logo</Paper>
          </Grid>
        </Grid>

      </Grid>
    )
  }
}

const styles = theme => ({
  musicTableToolbar: {
    borderColor: '#FFCDD2',
    borderStyle: 'dashed'
  },
  musicTable: {
    borderColor: '#D50000',
    borderStyle: 'dashed'
  },
  addNewSong: {
    borderColor: '#AA00FF',
    borderStyle: 'dashed'
  },
  playlistToolbar: {
    borderColor: '#304FFE',
    borderStyle: 'dashed'
  },
  playlist: {
    borderColor: '#18FFFF',
    borderStyle: 'dashed'
  },
  player: {
    borderColor: '#FF6F00',
    borderStyle: 'dashed'
  },
  logo: {
    borderColor: '#00C853',
    borderStyle: 'dashed'
  },
});

export default withStyles(styles)(LayoutTest)
