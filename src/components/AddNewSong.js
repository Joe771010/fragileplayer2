import React, {Component} from 'react'

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

class AddNewSong extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.div}>
        <Grid container spacing={0} alignItems='center' direction='column' className={classes.layout}>
          <Grid item xs={11} container justify='center'>
            <Input
              className={classes.input}
              value = {this.props.url}
              placeholder = 'Youtube URL'
              fullWidth
              onChange = {this.props.event_urlOnChange}
            />
          </Grid>
          <Grid item container spacing={8} justify='center'>
            <Grid item xs={7}>
              <Input
                className={classes.input}
                value = {this.props.title}
                placeholder = 'Title'
                fullWidth
                onChange = {this.props.event_titleOnChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                className={classes.input}
                value = {this.props.artist}
                placeholder = 'Artist'
                fullWidth
                onChange = {this.props.event_artistOnChange}
              />
            </Grid>
            <Grid item xs={1}>
              <Button disabled={!this.props.ready} color='secondary' fullWidth onClick={this.props.event_addNewSongOnClick}>
                OK
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  input: {
    fontFamily: 'Verdana',
  },
  layout: {
    backgroundColor: '#424242',
    borderRadius: '5px',
  },
  div: {
    backgroundColor: '#424242',
    // background: 'linear-gradient(to bottom, #525252, #313131)',
    borderRadius: '5px',
    height: '100%',
  }
})

export default withStyles(styles)(AddNewSong)
