require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const QUICKNODE_API_KEY_URL = process.env.QUICKNODE_API_KEY_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: QUICKNODE_API_KEY_URL,
      accounts: [GOERLI_PRIVATE_KEY],
    }
  },
  paths: {
    artifacts: '../application/src/contract',
  }
};
