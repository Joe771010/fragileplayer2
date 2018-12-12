import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import purple from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';
// import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';
import lightGreen from '@material-ui/core/colors/lightGreen';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';

import AccountContainer from './containers/AccountContainer.js'

import LayoutTest from './LayoutTest.js'

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: lightBlue,
    // secondary: pink,
    secondary: {
      main: '#F48FB1',
    },
  },
  overrides: {
    MuiSlider: {
      track: { backgroundColor: '#F06292' },
      thumb: { backgroundColor: '#EC407A' },
    },
    MuiTableRow: {
      selected: {
        backgroundColor: '#F48FB1 !important',
      },
    },
    // MuiListItem: {
    //   selected: {
    //     backgroundColor: '#F48FB1 !important',
    //   },
    // }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AccountContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;
