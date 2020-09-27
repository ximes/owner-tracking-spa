import React, { Suspense, useState, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { blueGrey, red} from "@material-ui/core/colors";
import { CssBaseline } from "@material-ui/core";
import { Footer, Header, FullpageLoader } from './components/UI';

const Home = lazy(() => import("./containers/Home/Home"));
const Owners = lazy(() => import("./containers/Owners/Owners"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    minHeight: 45,
    "@media (min-width:0px) and (orientation: landscape)": {
      minHeight: "inherit",
    },
    "@media (min-width:600px)": {
      minHeight: 48,
    },
  },
  content: {
    flexGrow: 1,
    padding: "0px",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blueGrey,
  },
});

function App() {
  const classes = useStyles();

  const [showHeaderTitle, setShowHeaderTitle] = React.useState(false);

  const handleShowHeaderTitle = (showTitle) => {
    setShowHeaderTitle(showTitle);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header showTitle={showHeaderTitle} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path="/owners" component={Owners} />
                <Route exact path="/help">
                  Help (TODO)
                </Route>
                <Route exact path="/events">
                  Events (TODO)
                </Route>
                <Route exact path="/accounts">
                  Account (TODO)
                </Route>
                <Route path="/">
                  <Home showHeaderTitleCallback={handleShowHeaderTitle} />
                </Route>
              </Switch>
            </Suspense>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;