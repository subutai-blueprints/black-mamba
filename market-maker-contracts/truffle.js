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
      host: "192.168.88.66",
      port: 8501,
      gasPrice: 1000000000,
      gas: 4700000,
      from: "0x65d601df30e19eeaae27355326fd2b98b4c007ea",
      network_id: '1515'
    },
    production: {
      host: "192.168.8.101",
      port: 8545,
      gasPrice: 1000000000,
      gas: 4700000,
      from: "0xdbc9fe56be4ae71b43872a3a8325d463748d6df7",
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
