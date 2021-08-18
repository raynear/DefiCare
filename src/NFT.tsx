import * as React from 'react';
import { useState, useEffect } from 'react';

import { Typography, Container, Grid, Paper, Button } from "@material-ui/core";
// import axios from "axios";

import Web3 from "web3";

import useStyles from "./Style";
import { NFTContractAddress, NFTABI, Retailer } from "./SmartContract";
import nftData from './provider';
// import { ContractAddress, ContractABI } from "./ContractInfo";


// interface FourC { clarity: '', cut: '', carat: '', color: '' }

function NFT(props: any) {
  const classes = useStyles();
  const id = parseInt(props.match.params.ID, 10);
  const web3 = new Web3((window as any).web3.currentProvider);
  const nftContract = new web3.eth.Contract(NFTABI as any, NFTContractAddress);

  const [values, setValues] = useState({ author: '', name: '' });
  const [inMyList, setInMyList] = useState(false);

//   const config = {
//     headers: {'Access-Control-Allow-Origin': '*'}
// };

  useEffect(() => {
    // axios.get("http://49.50.164.195:8888/v1/nft?id="+id.toString(), config).then((val) => {
    //   console.log(val);
      // const item = JSON.parse(val);
      // setValues({ author: item.author, name: item.name });
      setValues({ author: nftData[id].author, name: nftData[id].name });
    // });

    setInMyList(inMyStorageList(id));
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

  function rentNFT() {
    nftContract.methods.rentNFT(id).send({ from: Retailer }).then((r: any) => {
      console.log(r);
      // setMyStorageList(id);
      // setInMyList(true);
    });
  }

  function returnNFT() {
    console.log("returnNFT");
  }

  function submit() {
    console.log("submit");
    nftContract.methods.nft2ft(id).send().then((r: any) => {
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
              <Typography variant="h4" color="textSecondary" className={classes.listText}>NFT</Typography>
            </div>
            <Paper style={{ textAlign: "right" }}>
              <Grid container={true} className={classes.container}>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={6}>
                  <Typography>ID: {id}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={6}>
                  <Typography>Author: {values.author}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={6}>
                  <Typography>Name: {values.name}</Typography>
                </Grid>
                {!inMyList &&
                  <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                    <Button fullWidth={true} variant="contained" color="primary" onClick={rentNFT}>NFT={'>'}FT</Button>
                  </Grid>
                }
                {inMyList &&
                  <>
                    <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                      <Button fullWidth={true} variant="contained" color="primary" onClick={returnNFT}>반환</Button>
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

export default NFT;