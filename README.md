# Letter3
Letters for the future - a decentralized application (dapp) where you send messages to the world of the future, your messages will be permanently stored on the blockchain.

Smart contract deployed on Goerli testnet: 
[0x089FC8Af90891508F5826d55daee98f566553626](https://goerli.etherscan.io/address/0x089FC8Af90891508F5826d55daee98f566553626)

Web Application deployed on Vercel: https://letter3.vercel.app/

Get goerli test: https://faucets.chain.link/

## Features
* Add message
* Identify your message
* Pagination
* Scan transaction
* Detecting network and account changes

## Language & Framework
* Hardhat framework (Write, test and deploy smart contract)
* Solidity 0.8.0
* Chai (Test smart contract)
* Reactjs (Use function component)
* Bootstrap (UI)
* Firebase (Use to save transactions)
* Etherjs
* Vercel (Deploy web app)
* Quicknode, Goerli (Deploy smart contract)

## Project setup
### Smart contract
1. cd smart-contract
2. npm install
* **Deploy smart contract (local)**
1. npx hardhat node (keep terminal run, import accounts to metamask)
2. npx hardhat run scripts/deploy.js --network localhost (open another terminal)
* **Deploy smart contract (Goerli testnet)**
1. Create .env file and add:  
QUICKNODE_API_KEY_URL: "goerli-network-endpoint-from-quicknode"  
GOERLI_PRIVATE_KEY: "account-private-key"
2. npx hardhat run scripts/deploy.js --network goerli

### Frotend
1. cd application
2. npm install
3. Add .env  in application/src/ and add firebase config:  
REACT_APP_FBC_APIKEY=  
REACT_APP_FBC_AUTHDOMAIN=  
REACT_APP_FBC_PROJECTID=  
REACT_APP_FBC_STORAGEBUCKET=  
REACT_APP_FBC_MESSAGINGSENDERID=  
REACT_APP_FBC_APPID=  
REACT_APP_FBC_MEASUREMENTID=  
4. npm start
