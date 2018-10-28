var Web3 = require('web3');
var config = require('./config.json');

async function start() {
	var web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));

	const privateKey = config.private_key;
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3.eth.accounts.wallet.add(account);
	web3.eth.defaultAccount = account.address;
	await web3.eth.personal.importRawKey(privateKey, config.private_key_pwd);
	
	await web3.eth.personal.unlockAccount(web3.eth.defaultAccount, config.private_key_pwd , 360)
	.then((response) => {
		console.log(response);
	}).catch((error) => {
		console.log(error);
	});
};

start();