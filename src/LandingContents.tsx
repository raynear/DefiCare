import * as React from "react";

import { Typography, Grid, CssBaseline } from "@material-ui/core";

import useStyles from "./Style";

import dia1 from "./5.jpg";
// import dia3 from "./dia3.png";

// import asis from "./as-is.png";
// import tobe from "./to-be.png";

function LandingContents() {
  const classes = useStyles();
  return (
    <>
      <Grid container={true} className={classes.container}>
        <Grid item={true} className={classes.gridContents} xs={6} md={6} lg={6}>
          <img src={dia1} />
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={6} md={6} lg={6}>
          <Typography variant="h6" color="textPrimary">
            <b>블록체인의 진정한 가치는 신뢰 비용의 문제를 해결하는 것입니다.</b>
          </Typography>
          <Typography variant="body1" color="textPrimary">
            Defi Care는 블록체인의 진정한 가치를 최대로 활용할 수 있는 실제 비즈니스 문제의 솔루션을 제공하는데 자부심을 가지고 있습니다.
          </Typography>
        </Grid>
        <Grid item={true} className={classes.gridContents} xs={12} md={12} lg={12}>
          {" "}
          <CssBaseline />
          {" "}
        </Grid>
      </Grid>
    </>
  );
}

export default LandingContents;
