import React, { Component } from 'react';
import './App.css';

import web3 from './web3';
import marketMaker from './marletmaker';
// import gw from './gw';
// import khan from './khan';


class App extends Component {

  state = {
    khanAmount: '',
    gwAmount: '',
    gwCource: '',
    khanCource: '',
    message: 'test message',
    khan: '',
    gw: '',
    message: ''
  };

  componentDidMount= async (event) => {

    const khanA = await marketMaker.methods.getKHANAmount().call();
    const gwA = await marketMaker.methods.getGWAmount().call();

    const khanInWei = web3.utils.fromWei(khanA) / 1;
    const gwInWei = web3.utils.fromWei(gwA) / 1;

    this.setState({khanAmount:  khanInWei.toFixed(5)});
    this.setState({gwAmount: gwInWei.toFixed(5)});
  
    const khanBalance = khanA / gwA ;
    const gwBalance = gwA / khanA ;

    this.setState({khanCource:khanBalance.toFixed(5) });
    this.setState({gwCource:gwBalance.toFixed(5) });     
  }

  onExchangeKhantoGw = async (event) => {
   this.setState({message: 'Waiting on transaction success ...'});
   event.preventDefault();  
   const accounts = await web3.eth.getAccounts();

   try{
    await marketMaker.methods.exchangeKHANtoGW(web3.utils.toWei(this.state.khan, 'ether')).send({
      from: accounts[0]
    });

    this.setState({message: 'Transaction success!'});
  }catch (e) {
    this.setState({message: 'Transaction failed!'});
  }
  };

  onExchangeGWtoKhan = async (event) => {
    event.preventDefault();
    
    this.setState({message: 'Waiting on transaction success ...'});

    try{

    const accounts = await web3.eth.getAccounts();
 
     await marketMaker.methods.exchangeGWtoKHAN(web3.utils.toWei(this.state.gw, 'ether')).send({
       from: accounts[0]
     });
     this.setState({message: 'Transaction success!'});
    }catch(error){
      this.setState({message: 'Transaction failed!'});
    }
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
          KHAN Amount { this.state.khanAmount}
          <br/>
          GW Amount { this.state.gwAmount}

          </p>

<p>
{ this.state.message}
</p>


    </div>
    );
  }
}

export default App;
