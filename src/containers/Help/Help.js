import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Grid } from '@material-ui/core';
import HelpContents from "./help.en.md";

export default function Help(props){
  const [contents, setContents] = useState("");

  useEffect(() => {
    fetch(HelpContents).then((response) => response.text()).then((text) => {
      setContents(text)
    })
  });

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item>
          <ReactMarkdown escapeHtml={false} source={contents} />
        </Grid>
      </Grid>
    </Container>
  );
}
