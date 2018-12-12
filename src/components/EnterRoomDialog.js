import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import { withStyles } from '@material-ui/core/styles';

class EnterRoomDialog extends Component {
  render() {
    const { displayEnterRoomDialog } = this.props;
    const { classes } = this.props
    return (
      <Dialog
        open = {displayEnterRoomDialog}
        modal = 'true'
        onClose={()=>this.props.event_onEnterRoomDialogClose(false)}
      >
        <DialogContent>
          <Input
            autoFocus
            className={classes.input}
            placeholder={'Enter room name ...'}
            onChange={this.props.event_onEnterRoomInputChange}
            value={this.props.enterRoomName}
          />
          <Button disabled={this.props.enterRoomName.trim()===''} color='secondary' onClick={()=>this.props.event_onEnterRoomDialogClose(true)}>
            OK
          </Button>
          <Button color='primary' onClick={()=>this.props.event_onEnterRoomDialogClose(false)}>
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

export default withStyles(styles)(EnterRoomDialog)
