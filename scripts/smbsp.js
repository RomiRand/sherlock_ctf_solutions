const { parseEther, parseUnits } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");

  const setup = await SETUP.deploy({value: parseUnits("1", "ether")});
  const challenge = await ethers.getContractAt("CollectReward", await setup.instance());
  
  // res = await provider.getBlock(1);
  // console.log(res.timestamp);
  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(challenge.address, 0, {value: parseEther("1")}); // replace 0 in contract
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
