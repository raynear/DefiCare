import * as React from 'react';
import { Paper, Typography } from "@material-ui/core";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
// import LandingImage from './LandingImage';
import LandingContents from './LandingContents';

import useStyles from "./Style";

function LandingPage() {
  const classes = useStyles();
  return (

    <>
      <ParallaxProvider>
        <div className={classes.mainImg}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Typography variant="h4" className={classes.mainCopy}>Diamond is forever</Typography>
        </div>
        <Parallax y={[0, -30]}>
          <Paper className={classes.paper}>
            <LandingContents />
          </Paper>
        </Parallax>
      </ParallaxProvider>
    </>
  );
}

export default LandingPage;