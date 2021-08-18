import * as React from 'react';

import { Container, Grid, Paper, Button } from "@material-ui/core";
import Web3 from "web3";

import useStyles from "./Style";
// import { ContractAddress, ContractABI } from "./ContractInfo";


function Config({ match }: any) {
  const classes = useStyles();

  window.addEventListener('load', async () => {
    if ((window as any).web3) {
      (window as any).web3 = new Web3((window as any).web3.currentProvider);
    }
  });


  function setMyStorageList(id: number) {
    const tmpList = localStorage.getItem('MyList')
    if (tmpList) {
      const MyList = JSON.parse(tmpList);

      if (!MyList.includes(id)) {
        MyList.push(id);
      }
      localStorage.setItem('MyList', JSON.stringify(MyList));
    } else {
      localStorage.setItem('MyList', '[' + id.toString() + ']')
    }
  }

  function setStorage() {
    setMyStorageList(0);
    setMyStorageList(1);
    setMyStorageList(3);
    setMyStorageList(5);
    setMyStorageList(8);
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.rootcontainer}>
        <Grid container={true} className={classes.container}>
          <Grid item={true} xs={12} md={12} lg={12}>
            <Paper style={{ textAlign: "right" }}>
              <Grid container={true} className={classes.container}>
                <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                  <Button fullWidth={true} variant="contained" color="primary" onClick={setStorage}>Storage 설정</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Config;