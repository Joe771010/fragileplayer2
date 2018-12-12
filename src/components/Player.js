import React, {Component} from 'react'

import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/lab/Slider';

import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutline from '@material-ui/icons/PauseCircleOutline'
import VolumeUp from '@material-ui/icons/VolumeUp'
import Replay from '@material-ui/icons/Replay'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/playerStyle.js';

class Player extends Component {
  render() {
    const {classes} = this.props;
    const playIconButton = this.props.youtubeState===0? <Replay />:
                           this.props.youtubeState===1? <PauseCircleOutline />: <PlayCircleOutline />


    return (
      <div className={classes.div}>
      <Grid container spacing={0} >
        <Grid item xs={12}>
          <div align='center' className={classes.info}>{this.props.song.title} - {this.props.song.artist}</div>
        </Grid>

        <Grid item xs={12} container justify='center'>
          <Grid item xs={10}>
            <div align='center'>
              <Slider
                className={classes.slider}
                value={this.props.currentTime}
                min = {0}
                max = {this.props.duration}
                onChange={this.props.event_onTimeChange}
              />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} container justify='center' alignItems='center'>
          <Grid item xs={1}>
            <VolumeUp color='disabled'/>
          </Grid>
          <Grid item xs={2}>
            <Slider
              className={classes.slider}
              value={this.props.volume}
              min = {0}
              max = {100}
              onChange = {this.props.event_onVolumeChange}
            />
          </Grid>
          <Grid item xs={5}>
            <div align='center'>
              <IconButton
                onClick={this.props.event_onPrevClick}
              >
                <SkipPrevious />
              </IconButton>
              <IconButton
                onClick={this.props.event_onPlayClick}
              >
                {playIconButton}
              </IconButton>
              <IconButton
                onClick={this.props.event_onNextClick}
              >
                <SkipNext />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Select className={classes.select} value={this.props.playMode} fullWidth onChange={this.props.event_onPlayModeChange} >
              <MenuItem className={classes.menuItem} value={1} >依序播放</MenuItem>
              <MenuItem className={classes.menuItem} value={2} >單曲循環</MenuItem>
              <MenuItem className={classes.menuItem} value={3} >隨機播放</MenuItem>
            </Select>
          </Grid>
        </Grid>

      </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Player)
