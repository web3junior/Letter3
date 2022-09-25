# Letter3
Letters for the future

Smart contract deployed on Rinkeby testnet: 
[0xB40d716a9aF64CcB22FDBDfA073e98Dfeb6c4c6E](https://rinkeby.etherscan.io/address/0xB40d716a9aF64CcB22FDBDfA073e98Dfeb6c4c6E)

Application deployed on Vercel: https://letter3.vercel.app/

## Demo

![Demo](https://raw.githubusercontent.com/web3junior/Letter3/main/demo.gif) 

## Function List
* Add message
* Pagination
* Scan transaction on Etherscan

## Technology
* Hardhat framework (Write, test and deploy smart contract)
* Solidity 0.8.0
* Chai (Test smart contract)
* Reactjs (Use function component)
* Bootstrap (UI)
* Firebase (Use to save transactions)
* Etherjs
* Vercel (Deploy web app)
* Infura, Rinkeby (Deploy smart contract)

## Project setup
### Smart contract
1. cd smart-contract
2. npm install
* **Deploy smart contract (local)**
1. npx hardhat node (keep terminal run, import accounts to metamask)
2. npx hardhat run scripts/deploy.js --network localhost (open another terminal)
* **Deploy smart contract (Rinkeby testnet)**
1. Create .env file and add:  
**INFURA_API_KEY_URL:** "rinkeby-network-endpoint-from-infura"  
**RINKEBY_PRIVATE_KEY:** "account-private-key"
2. npx hardhat run scripts/deploy.js --network rinkeby

### Frotend
1. cd application
2. npm install
3. **Add .env**  in **application/src/** and add firebase config:  
**REACT_APP_FBC_APIKEY=**  
**REACT_APP_FBC_AUTHDOMAIN=**  
**REACT_APP_FBC_PROJECTID=**  
**REACT_APP_FBC_STORAGEBUCKET=**  
**REACT_APP_FBC_MESSAGINGSENDERID=**  
**REACT_APP_FBC_APPID=**  
**REACT_APP_FBC_MEASUREMENTID=**  
4. npm start