import * as React from 'react';
import { useState, useEffect } from 'react';

import { Typography, Container, Grid, Paper, Button } from "@material-ui/core";
// import axios from "axios";

import Web3 from "web3";

import useStyles from "./Style";
import { FTContractAddress, FTABI, OptionContractAddress, OptionABI } from "./SmartContract";
// import nftData from './provider';
// import { ContractAddress, ContractABI } from "./ContractInfo";

import art1 from './1.jpg';
// import art2 from './2.jpg';
// import art3 from './3.jpg';
// import art4 from './4.jpg';


// interface FourC { clarity: '', cut: '', carat: '', color: '' }

function FT(props: any) {
  const classes = useStyles();
  const web3 = new Web3((window as any).web3.currentProvider);
  const nftContract = new web3.eth.Contract(FTABI as any, FTContractAddress);
  const optionContract = new web3.eth.Contract(OptionABI as any, OptionContractAddress);

  const [values, setValues] = useState(0);

  //   const config = {
  //     headers: {'Access-Control-Allow-Origin': '*'}
  // };

  useEffect(() => {
    web3.eth.getAccounts().then((account: any) => {
      const myAddress = account[0];
      web3.eth.defaultAccount = myAddress;

      nftContract.methods.balanceOf(myAddress).call().then((balance: any) => {
        setValues(balance);
      });
    });
  }, [])

  window.addEventListener('load', async () => {
    if ((window as any).web3) {
      (window as any).web3 = new Web3((window as any).web3.currentProvider);
    }
  });

  // function setMyStorageList(aid: number) {
  //   const tmpList = localStorage.getItem('MyList')
  //   if (tmpList) {
  //     const MyList = JSON.parse(tmpList);

  //     if (!MyList.includes(aid)) {
  //       MyList.push(aid);
  //     }
  //     localStorage.setItem('MyList', JSON.stringify(MyList));
  //   } else {
  //     localStorage.setItem('MyList', '[' + aid.toString() + ']')
  //   }
  // }

  // function removeMyStorageList(aid: number) {
  //   const tmpList = localStorage.getItem('MyList')
  //   if (tmpList) {
  //     const MyList = JSON.parse(tmpList);

  //     if (MyList.includes(aid)) {
  //       MyList.pop(aid);
  //     }
  //     localStorage.setItem('MyList', JSON.stringify(MyList));
  //   }
  // }

  // function rentFT() {
  //   nftContract.methods.rentFT(id).send({ from: Retailer }).then((r: any) => {
  //     console.log(r);
  //     // setMyStorageList(id);
  //     // setInMyList(true);
  //   });
  // }

  // function returnFT() {
  //   console.log("returnFT");
  // }

  async function submit() {
    console.log("submit");

    const myAddress = (await web3.eth.getAccounts())[0];
    const amount = await nftContract.methods.balanceOf(myAddress).call();
    await optionContract.methods.requestOption(amount).send({from:myAddress});
    const id = 0;
    const obj = await optionContract.methods.ftOpts(id).call();

    await optionContract.methods.buyOption(id).send({from:myAddress, value: obj.price});

    // removeMyStorageList(id);
    props.history.push("/DefiCare/OptionList/");
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.rootcontainer}>
        <Grid container={true} className={classes.container}>
          <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
            <div className={classes.listImg}>
              <Typography variant="h4" color="textSecondary" className={classes.listText}>FT</Typography>
            </div>
            <Paper style={{ textAlign: "right" }}>
              <Grid container={true} className={classes.container}>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                    <img src={art1} />
                </Grid>

                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>Balance: {values}</Typography>
                </Grid>
                  <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                    <Button fullWidth={true} variant="contained" color="primary" onClick={submit}>FT={'>'}Put Option</Button>
                  </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default FT;