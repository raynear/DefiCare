import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Container } from "@material-ui/core";

import Web3 from "web3";

import Header from './Header';
import LandingPage from './LandingPage';
import NFTList from './NFTList';
import NFT from './NFT';
import FT from './FT';
import OptionList from './OptionList';
import Option from './Option';
import Config from './Config';
import Copyright from './Copyright';

function App() {
  const web3 = new Web3((window as any).web3.currentProvider);

  window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if ((window as any).ethereum) {
      (window as any).web3 = new Web3((window as any).ethereum);
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();
        // Accounts now exposed
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if ((window as any).web3) {
      (window as any).web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  });

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Header />
        <Router>
          <Switch>
            <Route exact={true} path="/DefiCare/" component={LandingPage} />
            <Route exact={true} path="/DefiCare/NFT/:ID" component={NFT} />
            <Route exact={true} path="/DefiCare/NFTList" component={NFTList} />
            <Route exact={true} path="/DefiCare/FT" component={FT} />
            <Route exact={true} path="/DefiCare/Option/:ID" component={Option} />
            <Route exact={true} path="/DefiCare/OptionList" component={OptionList} />
            <Route exact={true} path="/DefiCare/Config" component={Config} />
          </Switch>
        </Router>
        <Copyright />
      </Container>
    </div>
  );
}

export default App;
