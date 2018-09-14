import React, { Component } from 'react';
import './App.css';

import web3 from './web3';
import marketMaker from './marletmaker';
import gw from './gw';
import khan from './khan';


class App extends Component {

  state = {
    khanAmount: '',
    gwAmount: '',
    gwCource: '',
    khanCource: '',
    message: 'test message',
    khan: '',
    gw: ''
  };

  componentDidMount= async (event) => {

    const khanA = await marketMaker.methods.getNFRTAmount().call();
    const gwA = await marketMaker.methods.getFRTAmount().call();

    this.setState({khanAmount: web3.utils.fromWei(khanA)});
    this.setState({gwAmount: web3.utils.fromWei(gwA)});
    
    const address =  await marketMaker.methods.getMarketMakerAddress().call();

    const khanBalance = khanA / gwA ;
    const gwBalance = gwA / khanA ;

    this.setState({khanCource:khanBalance });
    this.setState({gwCource:gwBalance });     
  }

  onExchangeKhantoGw = async (event) => {
    event.preventDefault();
    
   const accounts = await web3.eth.getAccounts();

   // this.setState({message: 'Waiting on transaction success ...'});

   try{
    await marketMaker.methods.exchangeNFRTtoFRT(web3.utils.toWei(this.state.khan, 'ether')).send({
      from: accounts[0]
    });
  }catch (e) {
    console.log(e);
  }

  };

  onExchangeGWtoKhan = async (event) => {
    event.preventDefault();
    
    const accounts = await web3.eth.getAccounts();
 
     await marketMaker.methods.exchangeFRTtoNFRT(web3.utils.toWei(this.state.gw, 'ether')).send({
       from: accounts[0]
     });

  };

  render() {
   return (
    <div align='center'>
    <h2> Market Maker</h2>
       <form onSubmit={this.onExchangeKhantoGw}>
             <hr/>
           <div>
             <label> 1 KHAN to GW  {this.state.gwCource} </label>
              <input

              onChange = {event => this.setState({khan: event.target.value})}/> <button> Exchange </button>
          </div>
          </form>
          <form onSubmit={this.onExchangeGWtoKhan}>
          <hr/>
           <div>
             <label>1  GW to KHAN {this.state.khanCource} </label>
              <input
              onChange = {event => this.setState({gw: event.target.value})}/> <button> Exchange </button>
          </div>

        </form>

        <p>
          NFRT Amount { this.state.khanAmount}
          <br/>
          FRT Amount { this.state.gwAmount}

          </p>

    </div>
    );
  }
}

export default App;
