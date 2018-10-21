# Black Mamba Blueprint

Blueprint to create a Marcov Chain Monte Carlo simulation using Mamba
and Julia with simulation actions directly impacting Solidity contracts
on an Ethereum Sidechain.

This approach allows for system wide integration testing to find faults in
complex blockchain applications based on several Solidity contracts. It provides
a foundation for thoroughly future proofing autonomus systems like market makers
and independent SIPS systems.

## Ethereum Sidechain

By default a 4 node sidechain is created across 4 peers. This can be modified
during blueprint deployment via parameters specified in the wizard.

## Julia Worker Nodes

The same sidechain containers are used to parallelize the simulation. Julia is
installed on them and the nodes are made available to a master Julia node as
worker nodes.

## Jupyter Container

This container has Jupyter installed on it to provide a interactive notebook
for data scientists.

## Julia and Solidity Development Desktop

This is a MATE based desktop container that Subutai users can remote desktop to
for developing Solidity contracts and deploying them to the blockchain to be
simulation tested for future proofing systems using Mamba and Julia.

# Development

### Install dependencies
```
npm install --save
```

### Deploy contracts to local blockchain
```
truffle migrate --network development  --reset
```

### Run tests
```
npm run test
```

## Requirements to run application
1) Change `production` section in truffle.js

2) Deploy contracts to testnet, with command:
```
truffle migrate --network production  --reset
```
3) Run application

```
npm run start
```

