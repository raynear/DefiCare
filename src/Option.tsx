import * as React from 'react';
import { useState, useEffect } from 'react';

import { Typography, Container, Grid, Paper, Button } from "@material-ui/core";
// import axios from "axios";

import Web3 from "web3";

import useStyles from "./Style";
import { OptionContractAddress, OptionABI } from "./SmartContract";
// import { ContractAddress, ContractABI } from "./ContractInfo";

import art1 from './1.jpg';
import art2 from './2.jpg';
import art3 from './3.jpg';
import art4 from './4.jpg';


// interface FourC { clarity: '', cut: '', carat: '', color: '' }

function Option(props: any) {
  const classes = useStyles();
  const id = parseInt(props.match.params.ID, 10);
  const web3 = new Web3((window as any).web3.currentProvider);
  const contract = new web3.eth.Contract(OptionABI as any, OptionContractAddress);

  const [values, setValues] = useState({ amount:0, buyer:"", exercised:false, expiry:0, id:0, initPrice:0, optionPrice:0, targetPrice:0, writer:"" });

  //   const config = {
  //     headers: {'Access-Control-Allow-Origin': '*'}
  // };

  useEffect(() => {
    // axios.get("http://49.50.164.195:8888/v1/nft?id="+id.toString(), config).then((val) => {
    //   console.log(val);
    // const item = JSON.parse(val);
    // setValues({ author: item.author, name: item.name });

    web3.eth.getAccounts().then((account: any) => {
      const myAddress = account[0];
      web3.eth.defaultAccount = myAddress;
      console.log(myAddress);


    contract.methods.ftOpts(id).call().then((option: any) => {
      setValues({
        id:option.id as number,
        initPrice:option.initPrice as number,
        optionPrice:option.optionPrice as number,
        targetPrice:option.targetPrice as number,
        expiry:option.expiry as number,
        amount:option.amount as number,
        buyer:option.buyer as string,
        writer:option.writer as string,
        exercised: option.exercised as boolean
      });

    });
  });

  }, []);

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


  // function rentOption() {
  //   contract.methods.rentOption(id).send({ from: Retailer }).then((r: any) => {
  //     console.log(r);
  //     // setMyStorageList(id);
  //     // setInMyList(true);
  //   });
  // }

  // function returnOption() {
  //   console.log("returnOption");
  // }

  async function submit() {
    const myAddress = (await web3.eth.getAccounts())[0];

    console.log("submit");
    contract.methods.exercise(id).send({from:myAddress, value:values.targetPrice}).then((r: any) => {
      console.log(r);
      // removeMyStorageList(id);
      props.history.push("/DefiCare/NFTList/");
    })
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.rootcontainer}>
        <Grid container={true} className={classes.container}>
          <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
            <div className={classes.listImg}>
              <Typography variant="h4" color="textSecondary" className={classes.listText}>Put Option</Typography>
            </div>
            <Paper style={{ textAlign: "right" }}>
              <Grid container={true} className={classes.container}>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  {id === 0 &&
                    <img src={art1} />
                  }
                  {id === 1 &&
                    <img src={art2} />
                  }
                  {id === 2 &&
                    <img src={art3} />
                  }
                  {id === 3 &&
                    <img src={art4} />
                  }
                </Grid>

                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>ID: {id}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>Author: {values.amount}</Typography>
                </Grid>

                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>Author: {values.expiry}</Typography>
                </Grid>

                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>initPrice: {values.initPrice}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>optionPrice: {values.optionPrice}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>targetPrice: {values.targetPrice}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>buyer: {values.buyer}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={4}>
                  <Typography>writer: {values.writer}</Typography>
                </Grid>
                  <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                    <Button fullWidth={true} variant="contained" color="primary" onClick={submit}>Put Option exercise</Button>
                  </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Option;