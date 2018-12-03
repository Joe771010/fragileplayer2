import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import Grid from '@material-ui/core/Grid';
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
            className={classes.input}
            placeholder={'Enter your account ...'}
            onChange={event_onLoginInputChange}
          />
          <Button color='secondary' onClick={()=>event_onLoginClose(true)}>
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
