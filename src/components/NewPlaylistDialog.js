import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

class NewPlaylistDialog extends Component {
  render() {
    const { displayNewPlaylistDialog } = this.props;
    const {classes} = this.props
    return (
      <Dialog
        open = {displayNewPlaylistDialog}
        modal = 'true'
        onClose = {()=>this.props.event_onNewPlaylistClose(false)}
      >
        <DialogContent>
          <Input
            className={classes.input}
            placeholder={'Enter playlist name ...'}
            onChange={this.props.event_onNewPlaylistChange}
            value={this.props.newPlaylist}
          />
          <Button color='secondary' onClick={()=>this.props.event_onNewPlaylistClose(true)}>
            OK
          </Button>
          <Button color='primary' onClick={()=>this.props.event_onNewPlaylistClose(false)}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    )
    
  }
}

const styles = theme => ({
  input: {
    fontFamily: 'Verdana',
  },
})

export default withStyles(styles)(NewPlaylistDialog)
