import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { blueGrey, red} from "@material-ui/core/colors";
import { CssBaseline } from "@material-ui/core";
import { Footer, Header, FullpageLoader } from './components/UI';
import FeedbackMessage from "./components/UI/FeedbackMessage/FeedbackMessage";

const Home = lazy(() => import("./containers/Home/Home"));
const Owners = lazy(() => import("./containers/Owners/Owners"));
const Help = lazy(() => import("./containers/Help/Help"));

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
  const [registrationFormOpen, setRegistrationFormOpen] = React.useState(false);

  const [feedback, setFeedback] = React.useState({
    message: undefined,
    open: false,
    type: undefined,
  });

  const handleShowHeaderTitle = (showTitle) => {
    setShowHeaderTitle(showTitle);
  };

  const handleFeedback = (message) => {
    if (message) {
      setFeedback(message);
    }
  };

  const handleFeedbackClose = () => {
    setFeedback({
      open: false
    });
  };
  const handleRegistrationDrawerOpen = () => {
    setRegistrationFormOpen(true);
  };

  const handleRegistrationDrawerClose = (message) => {
    setRegistrationFormOpen(false);
    if (message) {
      setFeedback(message);
    }
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header showTitle={showHeaderTitle} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Suspense fallback={<FullpageLoader />}>
              <Switch>
                <Route exact path="/owners">
                  <Owners
                    registrationFormOpen={registrationFormOpen}
                    handleFeedback={handleFeedback}
                    handleRegistrationDrawerOpen={handleRegistrationDrawerOpen}
                    handleRegistrationDrawerClose={
                      handleRegistrationDrawerClose
                    }
                  />
                </Route>
                <Route exact path="/help" component={Help} />
                {/* <Route exact path="/events">Events (TODO)</Route>
                <Route exact path="/accounts">Account (TODO)</Route> */}
                <Route path="/">
                  <Home
                    showHeaderTitleCallback={handleShowHeaderTitle}
                    handleFeedback={handleFeedback}
                    registrationFormOpen={registrationFormOpen}
                    handleRegistrationDrawerOpen={handleRegistrationDrawerOpen}
                    handleRegistrationDrawerClose={
                      handleRegistrationDrawerClose
                    }
                  />
                </Route>
              </Switch>
            </Suspense>
            <FeedbackMessage
              {...feedback}
              handleFeedbackClose={handleFeedbackClose}
            />
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
