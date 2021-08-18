import * as React from "react";
// import { useState, useEffect } from "react";

import {
  Toolbar,
  Link
} from "@material-ui/core";

import useStyles from "./Style";

function Header() {
  const classes = useStyles();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link className={classes.toolbarLink} color="textPrimary" align="center" noWrap={true} variant="h5" href="/DefiCare/">
          <b>NFT Chain</b>
        </Link>
      </Toolbar>
      <Toolbar className={classes.toolbar}>
        <Link className={classes.toolbarLink} color="textSecondary" noWrap={true} variant="h6" href="/DefiCare/Config">{" "}</Link>
        <Link className={classes.toolbarLink} color="textSecondary" noWrap={true} variant="subtitle1" href="/DefiCare/NFTList">
          <b>Market</b>
        </Link>
        <Link className={classes.toolbarLink} color="textSecondary" noWrap={true} variant="subtitle1" href="/DefiCare/MyReportList">
          <b>My Report</b>
        </Link>
        <Link className={classes.toolbarLink} color="textSecondary" noWrap={true} variant="subtitle1" href="/DefiCare/NewReport">
          <b>New Report</b>
        </Link>
        <Link className={classes.toolbarLink} color="textSecondary" noWrap={true} variant="subtitle1" href="/DefiCare/Investor">
          <b>Investor</b>
        </Link>
        <Link className={classes.toolbarLink} color="textSecondary" noWrap={true} variant="subtitle1" href="/DefiCare/Config">{" "}</Link>
      </Toolbar>
    </>
  );
}

export default Header;