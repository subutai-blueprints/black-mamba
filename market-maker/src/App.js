import React, { Component } from 'react';
import './App.css';
import Web3  from 'web3';
import web3 from './web3';
import marketMaker from './marletmaker';

import { alert, buttons, jumbotron } from 'bootstrap-css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const address = '0x350e2371f0dda05a37746ded7108e3caba35f6b9';
const abi=[{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"inputToken","type":"uint256"},{"indexed":false,"name":"outputToken","type":"uint256"},{"indexed":false,"name":"fromToken","type":"string"},{"indexed":false,"name":"toToken","type":"string"}],"name":"exchange","type":"event"},{"constant":false,"inputs":[{"name":"gwAmount","type":"uint256"}],"name":"exchangeGWToKHAN","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"khanAmount","type":"uint256"}],"name":"exchangeKHANtoGW","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token1","type":"address"},{"name":"token2","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getGWAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getKHANAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMarketMakerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GW","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"KHAN","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];

var wsweb3 = new Web3( new Web3.providers.WebsocketProvider( 'ws://85.93.89.128:9898' ));
var mm = new wsweb3.eth.Contract( abi, address );
const products = [];

class BasicTable extends React.Component {
  render() {
    return (
      <BootstrapTable data={ products }>
          <TableHeaderColumn dataField='address' isKey={ true }>Address</TableHeaderColumn>
          <TableHeaderColumn dataField='from'>From</TableHeaderColumn>
          <TableHeaderColumn dataField='fromAmount'>From amount</TableHeaderColumn>
          <TableHeaderColumn dataField='to'>To</TableHeaderColumn>
          <TableHeaderColumn dataField='toAmount'>To amount</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}


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


  componentDidMount= async (event) => {


    await mm.getPastEvents(
      'exchange',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (err, events) => { 
        events.forEach(function(element) {

            products.push({
                address:  element.returnValues[0],
                from: element.returnValues[3],
                to: element.returnValues[4],
                fromAmount:  web3.utils.fromWei(element.returnValues[1], 'ether') ,
                toAmount: web3.utils.fromWei(element.returnValues[2], 'ether')
              });

          console.log('owner: ' + element.returnValues[0] );
          console.log('from amount: ' + element.returnValues[1]);
          console.log('amount to: ' + element.returnValues[2]);
          console.log('from : ' + element.returnValues[3]);
          console.log('to : ' + element.returnValues[4]);

          console.log(element);
        });
       }
    );

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
 
     await marketMaker.methods.exchangeGWToKHAN(web3.utils.toWei(this.state.gw, 'ether')).send({
       from: accounts[0]
     });
     this.setState({message: 'Transaction success!'});
    }catch(error){
      console.log(error);
      this.setState({message: 'Transaction failed!'});
    }
  };

  render() {
   return (
    <div align='center'>
    <h2> Market Maker</h2>
       <form onSubmit={this.onExchangeKhantoGw}>
           <div>
             <label> 1 KHAN to GW  {this.state.gwCource} &nbsp; </label>
              <input onChange = {event => this.setState({khan: event.target.value}) }/> <button> Exchange </button>
          </div>
          </form>
          <br/>
       <form onSubmit={this.onExchangeGWtoKhan}>
           <div>
             <label>1  GW to KHAN {this.state.khanCource} &nbsp; </label>
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
        <p>
           { this.state.message}
        </p>
 <BasicTable/>
    </div>    
    );
  }
}

export default App;