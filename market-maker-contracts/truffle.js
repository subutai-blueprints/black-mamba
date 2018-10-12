const { readFileSync } = require('fs')

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
      from: "0x6e06d8ff6d77c2b0c7b73320da33f1658fe9b058",
      network_id: '*'
    },
    production: {
      host: "192.168.8.102",
      port: 8501,
      gasPrice: 1000000000,
      gas: 4700000,
      from: "0x1e255de2294c0d8ed61f621213b33ab5d8bf7d5c",
      network_id: '1515'
    },
    development: {
      host: "192.168.0.102",
      port: 8501,
      gasPrice: 1000000000,
      gas: 7000000,
      from: "0x00484cdbfe1a589c97f6565fa7a1ca8422ba0a35",
      network_id: '1616'
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
