import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

class DeleteSongDialog extends Component {
  render() {
    return (
      <Dialog
        open = {this.props.displayDeleteSongDialog}
        modal = 'true'
        onClose = {()=>this.props.event_onDeleteSongClose(false)}
      >
        <DialogContent>
          <DialogContentText>
            Delete this song ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={()=>this.props.event_onDeleteSongClose(true)} >
            OK
          </Button>
          <Button color='primary' onClick={()=>this.props.event_onDeleteSongClose(false)} >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DeleteSongDialog
