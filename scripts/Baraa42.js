const { parseEther, parseUnits, formatUnits } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");
  
  const setup = await SETUP.deploy();
  const challenge = await ethers.getContractAt("Casino", await setup.casino());
  
  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(challenge.address, {value: 1});
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
