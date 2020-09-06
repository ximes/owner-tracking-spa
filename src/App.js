import React from "react";

import { Footer } from './components/UI';
import Home from './containers/Home/Home';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core';

import { FirebaseContext } from './components/Firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#cc0000",
      main: "#111111",
      contrastText: "#cccccc",
    },
    secondary: {
      main: "#59a1d4",
    },

  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FirebaseContext.Consumer>
          {(firebase) => <Home firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
