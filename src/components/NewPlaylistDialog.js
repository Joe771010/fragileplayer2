import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import { withStyles } from '@material-ui/core/styles';

class NewPlaylistDialog extends Component {
  render() {
    const { displayNewPlaylistDialog } = this.props;
    const {classes} = this.props
    return (
      <Dialog
        open = {displayNewPlaylistDialog}
        modal = 'true'
        onClose = {()=>this.props.event_onNewPlaylistDialogClose(false)}
      >
        <DialogContent>
          <Input
            autoFocus
            className={classes.input}
            placeholder={'Enter playlist name ...'}
            onChange={this.props.event_onNewPlaylistInputChange}
            value={this.props.newPlaylist}
          />
          <Button disabled={this.props.newPlaylist.trim()===''} color='secondary' onClick={()=>this.props.event_onNewPlaylistDialogClose(true)}>
            OK
          </Button>
          <Button color='primary' onClick={()=>this.props.event_onNewPlaylistDialogClose(false)}>
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
