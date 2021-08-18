import * as React from 'react';
import { useState, useEffect } from 'react';

import { Slider, Typography, Container, Grid, Paper, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Web3 from "web3";

import { Investor as InvestorAddress } from "./SmartContract";

import useStyles from "./Style";
// import { ContractAddress, ContractABI } from "./ContractInfo";


// interface FourC { clarity: '', cut: '', carat: '', color: '' }


const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function Investor({ match }: any) {
  const classes = useStyles();
  //  const id = match.params.id;

  const [values, setValues] = useState({ id: '', limitRate: 30, total: 100, principal: 90, profit: 10 })

  useEffect(() => {
    setValues({ id: '', limitRate: 30, total: 100, principal: 90, profit: 10 });
  }, [])

  window.addEventListener('load', async () => {
    if ((window as any).web3) {
      (window as any).web3 = new Web3((window as any).web3.currentProvider);
    }
  });

  const handleSlideChange = (e: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValues({ ...values, limitRate: newValue[0] })
    } else {
      setValues({ ...values, limitRate: newValue })
    }
  }

  function changeLimit() {
    console.log("changeLimit");
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.rootcontainer}>
        <Grid container={true} className={classes.container}>
          <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
            <div className={classes.listImg}>
              <Typography variant="h4" color="textSecondary" className={classes.listText}>Investor</Typography>
            </div>
            <Paper style={{ textAlign: "right" }}>
              <Grid container={true} className={classes.container}>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Typography>계정: {InvestorAddress}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Typography>거래당 투자 비율</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={10} md={10} lg={10}>
                  <PrettoSlider value={values.limitRate} onChange={handleSlideChange} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
                </Grid>
                <Grid item={true} className={classes.grid} xs={2} md={2} lg={2}>
                  <Button variant="contained" style={{ backgroundColor: "#52af77", color: "#FFFFFF" }} onClick={changeLimit} >투자 비율 변경</Button>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Typography>총액: {values.total} DIA</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Typography>원금: {values.principal} DIA</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Typography>수익: {values.profit} DIA</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Investor;