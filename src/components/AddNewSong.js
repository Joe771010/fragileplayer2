import React, {Component} from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

class AddNewSong extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Grid container spacing={0} direction='column'>
        <Grid item container>
          <Grid item xs={12}>
            <Input
              className={classes.input}
              value = {this.props.url}
              placeholder = 'Youtube URL'
              fullWidth
              onChange = {this.props.event_urlOnChange}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={8}>
          <Grid item xs={5}>
            <Input
              className={classes.input}
              value = {this.props.title}
              placeholder = 'Title'
              fullWidth
              onChange = {this.props.event_titleOnChange}
            />
          </Grid>
          <Grid item xs={5}>
            <Input
              className={classes.input}
              value = {this.props.artist}
              placeholder = 'Artist'
              fullWidth
              onChange = {this.props.event_artistOnChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button disabled={!this.props.ready} color='secondary' fullWidth onClick={this.props.event_addNewSongOnClick}>
              OK
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  input: {
    fontFamily: 'Verdana',
  },
})

export default withStyles(styles)(AddNewSong)
