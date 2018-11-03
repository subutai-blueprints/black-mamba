var Web3 = require('web3');
var config = require('./config.json');

async function start() {
        var web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));
        web3.eth.personal.unlockAccount(config.account, config.private_key_pwd, 600)
        .then((response) => {
                console.log(response);
        }).catch((error) => {
                console.log(error);
        });
};

start();
