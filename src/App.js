import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import marketMaker from './marketmaker';
import { alert, buttons, jumbotron } from 'bootstrap-css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


const products = [];

class BasicTable extends React.Component {
  render() {
    return (
      <BootstrapTable data={ products }>
          <TableHeaderColumn width="5%" dataField='idRow'>Id</TableHeaderColumn>
          <TableHeaderColumn width="15%"  dataField='address' isKey={ true }>Address</TableHeaderColumn>
          <TableHeaderColumn width="5%"  dataField='from'>From</TableHeaderColumn>
          <TableHeaderColumn width="7%"  dataField='fromAmount'>From amount</TableHeaderColumn>
          <TableHeaderColumn width="5%"  dataField='to'>To</TableHeaderColumn>
          <TableHeaderColumn width="20%"  dataField='toAmount'>To amount</TableHeaderColumn>
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
    gw: '',
    khanAddress: '',
    gwAddress: '',
    marketmakerAddress: ''
  };


  componentDidMount= async (event) => {
    await marketMaker.getPastEvents(
      'exchange',
      {
        fromBlock: 0,
        toBlock: 'latest'
      },
      (err, events) => { 
        var idRow = 0;
        events.forEach(function(element) {   
            products.push({
                idRow: idRow, 
                address:  element.returnValues[0],
                from: element.returnValues[3],
                to: element.returnValues[4],
                fromAmount:  web3.utils.fromWei(element.returnValues[1], 'ether') ,
                toAmount: web3.utils.fromWei(element.returnValues[2], 'ether')
              });
          
              idRow = idRow + 1;
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

    const khanAddress = await marketMaker.methods.khanAddress().call();
    const gwAddress = await marketMaker.methods.gwAddress().call();


    this.setState({marketmakerAddress: marketMaker.options.address });
    this.setState({khanAddress:khanAddress });
    this.setState({gwAddress:gwAddress });


 
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
    <h6>{this.state.marketmakerAddress}</h6>
    <h6> KHAN token address : {this.state.khanAddress}</h6>
    <h6> GW token address : {this.state.gwAddress}</h6>
    <hr/>
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

           {this.addressMM}
        </p>
 <BasicTable/>
    </div>    
    );
  }
}

export default App;