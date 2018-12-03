import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

class EditSongDialog extends Component {
  render() {
    const {classes} = this.props
    return (
      <Dialog
        open = {this.props.displayEditSongDialog}
        modal = 'true'
        onClose = {()=>this.props.event_onEditSongClose(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogContent>
          <Grid container spacing={8} direction='column'>
            <Grid item container>
              <Grid item xs={10} >
                <Input
                  className={classes.input}
                  fullWidth
                  placeholder='Title'
                  value={this.props.editSong.title}
                  onChange={this.props.event_onEditSongTitleChange}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  color='secondary'
                  onClick={()=>this.props.event_onEditSongClose(true)}
                >
                  OK
                </Button>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={10}>
                <Input
                  className={classes.input}
                  fullWidth
                  placeholder='Artist'
                  value={this.props.editSong.artist}
                  onChange={this.props.event_onEditSongArtistChange}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  color='primary'
                  onClick={()=>this.props.event_onEditSongClose(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

const styles = theme => ({
  input: {
    fontFamily: 'Verdana',
  },
});

export default withStyles(styles)(EditSongDialog)
