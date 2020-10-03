import React, {useEffect} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FeedbackMessage = (props) => (
  <Snackbar
    open={props.open}
    autoHideDuration={6000}
    onClose={props.handleFeedbackClose}
  >
    <Alert onClose={props.handleFeedbackClose} severity={props.type}>
      {props.message}
    </Alert>
  </Snackbar>
);;

export default FeedbackMessage;
