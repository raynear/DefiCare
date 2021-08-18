import * as React from 'react';
import { useState } from 'react';
import Web3 from "web3";
import axios from "axios";
import { TextField, Container, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@material-ui/core";

import useStyles from "./Style";


import { Gemmologist, reportContractAddress, reportABI } from "./SmartContract";

function NewReport() {
  const classes = useStyles();

  const inputLabel = React.useRef<HTMLLabelElement>(null);

  const [girdle, setGirdle] = useState("");
  const [wholeSalerAddress, setWholeSalerAddress] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [fourC, setFourC] = useState({ clarity: '', cut: '', carat: '', color: '' })
  const web3 = new Web3((window as any).web3.currentProvider);
  //  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545/'));

  const handleChange4C = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFourC({ ...fourC, [event.target.name]: event.target.value });
  };

  const handleGirdleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGirdle(event.target.value);
  };

  const handleWholeSalerAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWholeSalerAddress(event.target.value);
  };

  window.addEventListener('load', async () => {
    if ((window as any).web3) {
      (window as any).web3 = new Web3((window as any).web3.currentProvider);
    }
  });

  const handleReportChange = (event: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const hashed = web3.utils.keccak256(e.target.result);
      setFileHash(hashed);
    }
    reader.readAsText(event.target.files[0]);
  }

  function submit() {
    (window as any).web3.eth.getBlockNumber((e: any, r: any) => {
      if (e) {
        return e;
      } else {
        return r;
      }
    });


    console.log(fileHash);
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post('http://localhost:3333/registerReport', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      },
      cut: fourC.cut,
      color: fourC.color,
      clarity: fourC.clarity,
      carat: fourC.carat,
      girdleCode: girdle,
      issuer: Gemmologist,// web3.givenProvider.selectedAddress,
      reportHash: fileHash,
      wholeSaler: wholeSalerAddress
    }).then((response: any) => {
      console.log(response);
      const reportContract = new web3.eth.Contract(reportABI as any, reportContractAddress);
      reportContract.methods.register(response.data.girdleCode, response.data.ppRoot, JSON.stringify(response.data.schema)).send({
        from: web3.givenProvider.selectedAddress
      }).then((e: any, r: any) => { console.log(e, r) });

    });
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.rootcontainer}>
        <Grid container={true} className={classes.container}>
          <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
            <div className={classes.listImg}>
              <Typography variant="h4" color="textSecondary" className={classes.listText}>New Report</Typography>
            </div>
            <Paper style={{ textAlign: "right" }}>
              <Grid container={true} className={classes.container}>
                <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                  <TextField
                    required={true}
                    id="girdle"
                    name="girdle"
                    value={girdle}
                    label="Girdle Code"
                    fullWidth={true}
                    onChange={handleGirdleChange}
                  />
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                  <TextField
                    required={true}
                    id="wholeSalerAddress"
                    name="wholeSalerAddress"
                    value={wholeSalerAddress}
                    label="WholeSalerAddress"
                    fullWidth={true}
                    onChange={handleWholeSalerAddressChange}
                  />
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Button variant="contained" component="label">
                    <Typography>{"Upload Diamond Report"}</Typography>
                    <input id={"file-input"} style={{ display: 'none' }} type="file" name="reportFile" onChange={handleReportChange} />
                  </Button>
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel}>
                      Carat
                    </InputLabel>
                    <Select
                      id="carat"
                      name="carat"
                      value={fourC.carat}
                      onChange={handleChange4C}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="0.25">0.25</MenuItem>
                      <MenuItem value="0.5">0.5</MenuItem>
                      <MenuItem value="0.75">0.75</MenuItem>
                      <MenuItem value="1.0">1.0</MenuItem>
                      <MenuItem value="1.25">1.25</MenuItem>
                      <MenuItem value="1.5">1.5</MenuItem>
                      <MenuItem value="1.75">1.75</MenuItem>
                      <MenuItem value="2.0">2.0</MenuItem>
                      <MenuItem value="2.5">2.5</MenuItem>
                      <MenuItem value="3.0">3.0</MenuItem>
                      <MenuItem value="3.5">3.5</MenuItem>
                      <MenuItem value="4.0">4.0</MenuItem>
                      <MenuItem value="5.0">5.0</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel}>
                      Clarity
                    </InputLabel>
                    <Select
                      id="clarity"
                      name="clarity"
                      value={fourC.clarity}
                      onChange={handleChange4C}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="FL">FL</MenuItem>
                      <MenuItem value="VVS1">VVS1</MenuItem>
                      <MenuItem value="VVS2">VVS2</MenuItem>
                      <MenuItem value="VS1">VS1</MenuItem>
                      <MenuItem value="VS2">VS2</MenuItem>
                      <MenuItem value="SI1">SI1</MenuItem>
                      <MenuItem value="SI2">SI2</MenuItem>
                      <MenuItem value="SI3">SI3</MenuItem>
                      <MenuItem value="I1">I1</MenuItem>
                      <MenuItem value="I2">I2</MenuItem>
                      <MenuItem value="I3">I3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel}>
                      Cut
                    </InputLabel>
                    <Select
                      id="cut"
                      name="cut"
                      value={fourC.cut}
                      onChange={handleChange4C}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="EXCELLENT">EXCELLENT</MenuItem>
                      <MenuItem value="VERYGOOD">VERYGOOD</MenuItem>
                      <MenuItem value="GOOD">GOOD</MenuItem>
                      <MenuItem value="FAIR">FAIR</MenuItem>
                      <MenuItem value="POOR">POOR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel}>
                      Color
                    </InputLabel>
                    <Select
                      id="color"
                      name="color"
                      value={fourC.color}
                      onChange={handleChange4C}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="D">D</MenuItem>
                      <MenuItem value="E">E</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                      <MenuItem value="G">G</MenuItem>
                      <MenuItem value="H">H</MenuItem>
                      <MenuItem value="I">I</MenuItem>
                      <MenuItem value="J">J</MenuItem>
                      <MenuItem value="K">K</MenuItem>
                      <MenuItem value="L">L</MenuItem>
                      <MenuItem value="M">M</MenuItem>
                      <MenuItem value="N">N</MenuItem>
                      <MenuItem value="O">O</MenuItem>
                      <MenuItem value="P">P</MenuItem>
                      <MenuItem value="Q">Q</MenuItem>
                      <MenuItem value="R">R</MenuItem>
                      <MenuItem value="S">S</MenuItem>
                      <MenuItem value="T">T</MenuItem>
                      <MenuItem value="U">U</MenuItem>
                      <MenuItem value="V">V</MenuItem>
                      <MenuItem value="W">W</MenuItem>
                      <MenuItem value="X">X</MenuItem>
                      <MenuItem value="Y">Y</MenuItem>
                      <MenuItem value="Z">Z</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Button fullWidth={true} variant="contained" color="primary" onClick={submit}>제출</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default NewReport;