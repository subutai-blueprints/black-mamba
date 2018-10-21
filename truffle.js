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
      from: "0x2748ee00126408d9009a8b066f4ca36ada395101",
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