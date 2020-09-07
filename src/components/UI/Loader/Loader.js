import React from 'react';
import { Backdrop, CircularProgress} from "@material-ui/core";

export default function Loader(){
  return (
  <Backdrop open>
    <CircularProgress color="secondary" />
  </Backdrop>
  );
}