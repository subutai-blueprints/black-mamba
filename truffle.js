const { readFileSync } = require('fs')
var config = require('./config.json');
module.exports = {
 solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    test: {
      host: "127.0.0.1",
      port: 8545,
      gasPrice: 1000000000,
      gas: 4700000,
      from: "0x2748ee00126408d9009a8b066f4ca36ada395101",
      network_id: '*'
    },
    production: {
      host: config.host,
      port: config.port,
      gasPrice: 1000000000,
      gas: 4700000,
      from: config.account,
      network_id: config.network_id
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      gasPrice: 1000000000,
      gas: 4700000,
      from: "0x61e80ca5f7c4a5cf0f74281a267b54950d9bfa60",
      network_id: '*'
    }, 
    docker: {
        host: "192.168.0.102",
        port: 9000,
        network_id: "8000"
    }
  },
  mocha: {
    ui: "bdd",
    reporterOptions: {
      'mocha-osx-reporter': '-',
      'spec': '-'
    }
  }
};