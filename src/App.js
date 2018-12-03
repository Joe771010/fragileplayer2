import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

import AccountContainer from './containers/AccountContainer.js'

import LayoutTest from './LayoutTest.js'

const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
    // primary: purple,
    // secondary: orange,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AccountContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;
