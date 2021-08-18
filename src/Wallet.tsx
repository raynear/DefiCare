import * as React from 'react';
import { useState, useEffect } from 'react';

import { Typography, Container, Grid, Paper, Button } from "@material-ui/core";
import Web3 from "web3";

import useStyles from "./Style";
import { poolContractAddress, poolABI, marketContractAddress, marketABI, Retailer } from "./SmartContract";
// import { ContractAddress, ContractABI } from "./ContractInfo";


// interface FourC { clarity: '', cut: '', carat: '', color: '' }

function Wallet(props: any) {
  const classes = useStyles();
  const id = parseInt(props.match.params.ID, 10);
  const web3 = new Web3((window as any).web3.currentProvider);
  const marketContract = new web3.eth.Contract(marketABI as any, marketContractAddress);
  const poolContract = new web3.eth.Contract(poolABI as any, poolContractAddress);

  const [values, setValues] = useState({ clarity: '', cut: '', carat: '', color: '', price: 0, id: '', reportHash: '' })
  const [inMyList, setInMyList] = useState(false);


  useEffect(() => {

    marketContract.methods.getDiamond(props.match.params.ID).call().then((r: any) => {
      setValues({ clarity: r[1], cut: r[2], carat: r[3], color: r[4], price: r[5], id: r[0], reportHash: r[6] })
    });

    setInMyList(inMyStorageList(id));
  }, [])

  window.addEventListener('load', async () => {
    if ((window as any).web3) {
      (window as any).web3 = new Web3((window as any).web3.currentProvider);
    }
  });

  function setMyStorageList(aid: number) {
    const tmpList = localStorage.getItem('MyList')
    if (tmpList) {
      const MyList = JSON.parse(tmpList);

      if (!MyList.includes(aid)) {
        MyList.push(aid);
      }
      localStorage.setItem('MyList', JSON.stringify(MyList));
    } else {
      localStorage.setItem('MyList', '[' + aid.toString() + ']')
    }
  }

  function removeMyStorageList(aid: number) {
    const tmpList = localStorage.getItem('MyList')
    if (tmpList) {
      const MyList = JSON.parse(tmpList);

      if (MyList.includes(aid)) {
        MyList.pop(aid);
      }
      localStorage.setItem('MyList', JSON.stringify(MyList));
    }
  }

  function inMyStorageList(aid: number) {
    const tmpList = localStorage.getItem('MyList')
    if (tmpList) {
      const MyList = JSON.parse(tmpList);

      if (MyList.includes(aid)) {
        return true;
      }
    }
    return false;
  }

  function rentDia() {
    marketContract.methods.rentDiamond(id).send({ from: Retailer }).then((r: any) => {
      console.log(r);
      setMyStorageList(id);
      setInMyList(true);
    });
  }

  function returnDia() {
    console.log("returnDia");
  }

  function submit() {
    console.log("submit");
    poolContract.methods.sattleforDeposit(id, 10).send({ from: Retailer }).then((r: any) => {
      console.log(r);
      removeMyStorageList(id);
      props.history.push("/DefiCare/NFTList/");
    })
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.rootcontainer}>
        <Grid container={true} className={classes.container}>
          <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
            <div className={classes.listImg}>
              <Typography variant="h4" color="textSecondary" className={classes.listText}>Diamond</Typography>
            </div>
            <Paper style={{ textAlign: "right" }}>
              <Grid container={true} className={classes.container}>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={6}>
                  <Typography>ID: {values.id}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={6}>
                  <Typography>Price: {values.price}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Typography>Report Hash: {values.reportHash}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={3} lg={3}>
                  <Typography>
                    Carat: {values.carat}
                  </Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={3} lg={3}>
                  <Typography>
                    Clarity: {values.clarity}
                  </Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={3} lg={3}>
                  <Typography>
                    Cut: {values.cut}
                  </Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={3} lg={3}>
                  <Typography>
                    Color: {values.color}
                  </Typography>
                </Grid>
                {!inMyList &&
                  <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                    <Button fullWidth={true} variant="contained" color="primary" onClick={rentDia}>wanna Rent</Button>
                  </Grid>
                }
                {inMyList &&
                  <>
                    <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                      <Button fullWidth={true} variant="contained" color="primary" onClick={returnDia}>반환</Button>
                    </Grid>
                    <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                      <Button fullWidth={true} variant="contained" color="primary" onClick={submit}>판매확정(송금)!</Button>
                    </Grid>
                  </>
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Wallet;