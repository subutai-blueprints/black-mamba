/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { alert, buttons, jumbotron } from 'bootstrap-css'
import Web3  from 'web3';
import web3 from './web3';

const address = '0x350e2371f0dda05a37746ded7108e3caba35f6b9';
const abi=[{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"inputToken","type":"uint256"},{"indexed":false,"name":"outputToken","type":"uint256"},{"indexed":false,"name":"fromToken","type":"string"},{"indexed":false,"name":"toToken","type":"string"}],"name":"exchange","type":"event"},{"constant":false,"inputs":[{"name":"gwAmount","type":"uint256"}],"name":"exchangeGWToKHAN","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"khanAmount","type":"uint256"}],"name":"exchangeKHANtoGW","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"token1","type":"address"},{"name":"token2","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getGWAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getKHANAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMarketMakerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GW","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"KHAN","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];

var wsweb3 = new Web3( new Web3.providers.WebsocketProvider( 'ws://85.93.89.128:9898' ));
var mm = new wsweb3.eth.Contract( abi, address );
const products = [];


function test () {

mm.getPastEvents(
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
}

test();

export default class BasicTable extends React.Component {
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