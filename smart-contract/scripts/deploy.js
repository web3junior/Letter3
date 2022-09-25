const hre = require("hardhat");
var fs = require('fs');

async function main() {
  const Letter = await hre.ethers.getContractFactory("Letter");
  const letter = await Letter.deploy();

  await letter.deployed();

  console.log(
    `Letter deployed to ${letter.address}`
  );

  const contract_address_var = `export const CONTRACT_ADDRESS = "${letter.address}"`;
  
  // save to application
  fs.writeFile('../application/src/constants.js', contract_address_var, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
