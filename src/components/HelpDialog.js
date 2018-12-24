import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

class HelpDialog extends Component {
  render() {
    const {classes} = this.props
    return (
      <Dialog
        open = {this.props.displayHelpDialog}
        modal = 'true'
        onClose = {this.props.event_onHelpClose}
        maxWidth = 'false'
      >
        <DialogContent fullWidth>
          <DialogContentText className={classes.text}>
            1. 輸入使用者名稱(無須密碼)
          </DialogContentText>
          <DialogContentText className={classes.text}>
            2. 加入喜歡的Youtube歌曲至歌庫(將Youtube網址貼上即可，可自己編輯歌名與演唱者)
          </DialogContentText>
          <DialogContentText className={classes.text}>
            3. 在歌庫點兩下滑鼠即可播放，亦可在右方建立播放清單，將歌曲加入
          </DialogContentText>
          <DialogContentText className={classes.text}>
            4. 進入相同名稱的Room，即可與同一個Room的人共享歌單
          </DialogContentText>
          <DialogContentText className={classes.text}>
          </DialogContentText>
          <DialogContentText className={classes.text}>
            <a href='https://github.com/Joe771010/fragileplayer2' target="_blank" className={classes.github}>
              Source code on Github
            </a>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

const styles = theme => ({
  text: {
    fontFamily: 'Microsoft JhengHei',
  },
  github: {
    // fontFamily: 'Microsoft JhengHei',
    color: 'pink',
  },
});

export default withStyles(styles)(HelpDialog)
