import * as React from 'react';
import { useState, useEffect } from 'react';

import { TextField, Typography, Container, Grid, Paper, Button, Link } from "@material-ui/core";
import Web3 from "web3";
import axios from "axios";

import useStyles from "./Style";
import { WholeSaler, NFTContractAddress, NFTABI, marketContractAddress, marketABI } from "./SmartContract";
// import { ContractAddress, ContractABI } from "./ContractInfo";


// interface FourC { clarity: '', cut: '', carat: '', color: '' }

function Report(props: any) {
  const classes = useStyles();
  //  const id = match.params.id;

  const [values, setValues] = useState({ clarity: '', cut: '', carat: '', color: '', price: 0, girdleCode: '', tokenId: '', reportRoot: '' })
  const [myNFT, setMyNFT] = useState(false);
  const [price, setPrice] = useState(0);
  const [proof, setProof] = useState({ proof: "", inputs: "", commitment: "", salt: "", tokenId: "" });

  const web3 = new Web3((window as any).web3.currentProvider);

  useEffect(() => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post('http://localhost:3333/getInfos/' + WholeSaler.toLowerCase() + "/" + props.match.params.GirdleCode/*web3.givenProvider.selectedAddress*/, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
      }
    }).then((response: any) => {
      console.log(response);
      console.log(response.data);
      // for (const i in response.data) {
      //   if(parseInt(i,10)>0) {
      //     console.log(response.data[i]);
      //     if(response.data[i].tokenId === match.params.GirdleCode) {
      //       console.log("My DIA Report!!!!!")
      //     }
      //   }
      // }
      // tokenId가 없으면 NFT 발행 버튼
      // tokenId가 있으면 Price 입력창 과 market 매물 올리기 버튼
      // 둘 모두 my dia 일때만 가능

      setValues({ clarity: response.data.clarity, cut: response.data.cut, carat: response.data.carat, color: response.data.color, price: 13131313, girdleCode: response.data.girdleCode, tokenId: (response.data.tokenId === undefined ? "" : response.data.tokenId), reportRoot: response.data.reportRoot });

      if (values.tokenId === "") {
        axios.post('http://localhost:3333/getInfos/' + WholeSaler.toLowerCase()/*web3.givenProvider.selectedAddress*/, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
          }
        }).then((response2: any) => {
          console.log(response2);
          console.log(response2.data);
          for (const i in response.data) {
            if (response.data[i].girdleCode === props.match.params.girdleCode) {
              setMyNFT(true);
            }
          }
        });

        axios.post('http://localhost:3333/generateMintProof/'/*web3.givenProvider.selectedAddress*/, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
          },
          girdleCode: response.data.girdleCode,
          address: WholeSaler
        }).then((response2: any) => {
          console.log(response2);
          console.log(response2.data);
          setProof({ proof: response2.data.proof, inputs: response2.data.inputs, commitment: response2.data.commitment, salt: response2.data.salt, tokenId: (response2.data.tokenId === undefined ? "" : response2.data.tokenId) });
          //        setValues({...values, tokenId:response2.data.tokenId})
          console.log(proof);
          console.log(typeof values.tokenId);
        });
      }
    });
    /*
        const roleContract = new web3.eth.Contract(playerRoleABI as any, playerRoleContractAddress);
    
        web3.eth.getAccounts().then((account: any) => {
          console.log(account);
          const myAddress = account[0];
          web3.eth.defaultAccount = myAddress;
          roleContract.methods.checkPlayerRole(myAddress).call().then((r: any) => {
            const r1 = parseInt(r[0], 10);
            const r2 = parseInt(r[1], 10);
            const r3 = parseInt(r[2], 10);
    
            if (r1 === 1 || r2 === 1 || r3 === 1) {
              setRole(1);
            } else if (r1 === 2 || r2 === 2 || r3 === 2) {
              setRole(2);
            } else if (r1 === 3 || r2 === 3 || r3 === 3) {
              setRole(3);
            }
          })
    */
    //      setInMyList(inMyCookieList(parseInt(match.params.ID, 10)));

    //      setValues({ clarity: 'VVS', cut: 'Good', carat: '3/4', color: 'F', price: 4000000,, certinfo: 'BB에서 인증 되었음' });
    //    });

    /*
        const marketContract = new web3.eth.Contract(marketABI as any, marketContractAddress);
    
        marketContract.methods.getNFT(match.params.ID).call().then((r: any) => {
          setValues({ clarity: r[1], cut: r[2], carat: r[3], color: r[4], price: r[5], id: r[0], certinfo: r[6] })
        })
    
        const roleContract = new web3.eth.Contract(playerRoleABI as any, playerRoleContractAddress);
    
        web3.eth.getAccounts().then((account: any) => {
          const myAddress = account[0];
          web3.eth.defaultAccount = myAddress;
          roleContract.methods.checkPlayerRole(myAddress).call().then((r: any) => {
            const r1 = parseInt(r[0], 10);
            const r2 = parseInt(r[1], 10);
            const r3 = parseInt(r[2], 10);
    
            if (r1 === 1 || r2 === 1 || r3 === 1) {
              setRole(1);
            } else if (r1 === 2 || r2 === 2 || r3 === 2) {
              setRole(2);
            } else if (r1 === 3 || r2 === 3 || r3 === 3) {
              setRole(3);
            }
          })
    
          setInMyList(inMyCookieList(parseInt(match.params.ID, 10)));
    
          setValues({ clarity: 'VVS', cut: 'Good', carat: '3/4', color: 'F', price: 4000000, id: match.params.ID, certinfo: 'BB에서 인증 되었음' });
        });
        */
  }, [])

  window.addEventListener('load', async () => {
    if ((window as any).web3) {
      (window as any).web3 = new Web3((window as any).web3.currentProvider);
    }
  });
  /*
    function inMyCookieList(id: number) {
      const Cookies = document.cookie.split(";");
      for (const i in Cookies) {
        if (Cookies[i].split("=")[0].trim() === "MyNFTList") {
          const NFTList = JSON.parse(Cookies[i].split("=")[1]);
          if (NFTList.includes(id)) {
            return true;
          }
        }
      }
      return false;
    }
  */
  function mintNFT() {
    web3.eth.getAccounts().then((account: any) => {
      const myAddress = account[0];
      web3.eth.defaultAccount = myAddress;
      console.log(account[0]);
    });
    const contract = new web3.eth.Contract(NFTABI as any, NFTContractAddress);
    contract.methods.mint(proof.proof, proof.inputs, values.reportRoot, proof.tokenId, proof.commitment).send({ from: WholeSaler }).then((r: any) => {
      console.log(r);
      console.log(r.events.Mint.returnValues.commitment_index);
      console.log(r.events.Mint.returnValues.token_id);

      axios.post('http://localhost:3333/storeNFT/'/*web3.givenProvider.selectedAddress*/, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        },
        address: WholeSaler.toLowerCase(),
        reportRoot: values.reportRoot,
        tokenId: proof.tokenId,
        commitment: proof.commitment,
        commitmentIndex
          : r.events.Mint.returnValues.commitment_index
      }).then((response2: any) => {

        console.log(response2.data);
        setValues({ ...values, tokenId: proof.tokenId });
      });

    });
    console.log(contract);

    console.log("mintNFT");
  }
  function submit() {
    (window as any).web3.eth.getBlockNumber((e: any, r: any) => {
      if (e) {
        return e;
      } else {
        return r;
      }
    });
    console.log("tokenId empty?", values.tokenId === "")
    console.log(values.tokenId);

    const contract = new web3.eth.Contract(marketABI as any, marketContractAddress);
    contract.methods.register(values.cut, values.color, values.clarity, values.carat, values.reportRoot, price).send({ from: WholeSaler }).then((r: any) => {
      console.log(r);
      props.history.push("/DefiCare/NFTList/");
    });//    inMyCookieList(match.params.ID);
  }

  const handlePriceChange = (e: any) => {
    console.log(e);
    setPrice(e.target.value)
  }

  return (
    <>
      <Container maxWidth="lg" className={classes.rootcontainer}>
        <Grid container={true} className={classes.container}>
          <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
            <div className={classes.listImg}>
              <Typography variant="h4" color="textSecondary" className={classes.listText}>Report</Typography>
            </div>
            <Paper style={{ textAlign: "right" }}>
              <Grid container={true} className={classes.container}>
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
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={6}>
                  <Typography>GirdleCode:{values.girdleCode}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={6} lg={6}>
                  <Typography>tokenId: {values.tokenId}</Typography>
                </Grid>
                <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                  <Link href='https://uniglodiamonds.com/wp-content/uploads/2019/05/NFT-Grading-Report.jpg' target="_blank" download={true}>Click to download report</Link>
                </Grid>
                {myNFT && values.tokenId === "" && // my nft 일때 tokenId가 없으면 NFT 발행 버튼
                  <Grid item={true} className={classes.grid} xs={12} md={12} lg={12}>
                    <Button fullWidth={true} variant="contained" color="primary" onClick={mintNFT}>NFT 발행</Button>
                  </Grid>
                }
                {myNFT && values.tokenId !== "" && // my nft 일때 tokenId가 있으면 Price 입력창 과 market 매물 올리기 버튼
                  <>
                    <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                      <TextField
                        required={true}
                        id="price"
                        name="price"
                        value={price}

                        type="number" label="Price"
                        fullWidth={true}
                        onChange={handlePriceChange}
                      />
                    </Grid>
                    <Grid item={true} className={classes.grid} xs={6} md={6} lg={6}>
                      <Button fullWidth={true} variant="contained" color="primary" onClick={submit}>판매 리스트에 올리기!</Button>
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

export default Report;