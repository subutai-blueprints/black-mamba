import React, { Component } from 'react';
import './App.css';
import Web3  from 'web3';
import web3 from './web3';
import marketMaker from './marletmaker';
// import gw from './gw';
// import khan from './khan';
const address = '0xe3ac041517c68ac94f5e0e3ef3c43eb4eb9928db';
const abi=[{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"inputToken","type":"uint256"},{"indexed":false,"name":"outputToken","type":"uint256"},{"indexed":false,"name":"fromToken","type":"string"},{"indexed":false,"name":"toToken","type":"string"}],"name":"exchange","type":"event"},{"constant":false,"inputs":[{"name":"gwAmount","type":"uint256"}],"name":"exchangeGWtoKHAN","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"khanAmount","type":"uint256"}],"name":"exchangeKHANtoGW","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getGWAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getKHANAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMarketMakerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GW","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"KHAN","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];

class App extends Component {

  state = {
    khanAmount: '',
    gwAmount: '',
    gwCource: '',
    khanCource: '',
    message: '',
    khan: '',
    gw: ''
  };

  onEvent = async (event) => {
    event.preventDefault();

    console.log("click");

    var wsweb3 = new Web3( new Web3.providers.WebsocketProvider( 'ws://85.93.89.128:9898' ));
    var mm = new wsweb3.eth.Contract( abi, address );

    mm.getPastEvents(
      'exchange',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (err, events) => { 
        events.forEach(function(element) {
          console.log('owner: ' + element.returnValues[0] );
          console.log('from amount: ' + element.returnValues[1]);
          console.log('amount to: ' + element.returnValues[2]);
          console.log('from : ' + element.returnValues[3]);
          console.log('to : ' + element.returnValues[4]);

          console.log(element);
        });
       }
    )

  }

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
     
           <div>
             <label> 1 KHAN to GW  {this.state.gwCource} </label>
              <input

              onChange = {event => this.setState({khan: event.target.value})}/> <button> Exchange </button>
          </div>
          </form>

          <br/>
       <form onSubmit={this.onExchangeGWtoKhan}>
     
           <div>
             <label>1  GW to KHAN {this.state.khanCource} </label>
              <input
              onChange = {event => this.setState({gw: event.target.value})}/> <button> Exchange </button>
          </div>
        </form>

 <br/>
        <p>
          KHAN Amount <br/> { this.state.khanAmount}
          <br/>
          <br/>
          GW Amount <br/> { this.state.gwAmount}

        </p>
        <hr/>
        
        <button onClick={this.onEvent}>
 Test
</button>
        <hr/>

<p>
{ this.state.message}
</p>


    </div>
    );
  }
}

export default App;