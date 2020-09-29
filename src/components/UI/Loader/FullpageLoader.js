import React from 'react';
import { Backdrop } from "@material-ui/core";
import Loader from "./Loader";

export default function FullpageLoader(){
  return (
  <Backdrop open>
    <Loader />
  </Backdrop>
  );
}
