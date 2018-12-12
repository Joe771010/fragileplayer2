import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import { withStyles } from '@material-ui/core/styles';

class LoginDialog extends Component {
  render() {
    const {displayLoginDialog, event_onLoginInputChange, event_onLoginClose} = this.props;
    const {classes} = this.props
    return (
      <Dialog
        open = {displayLoginDialog}
        modal = 'true'
      >
        <DialogContent>
          <Input
            autoFocus
            className={classes.input}
            placeholder={'Enter your account ...'}
            onChange={event_onLoginInputChange}
          />
          <Button disabled={this.props.userNameInput.trim()===''} color='secondary' onClick={()=>event_onLoginClose(true)}>
            OK
          </Button>
          <Button color='primary' onClick={()=>event_onLoginClose(false)}>
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

export default withStyles(styles)(LoginDialog)
