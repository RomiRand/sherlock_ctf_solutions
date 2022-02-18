const { parseEther, parseUnits } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");

  const setup = await SETUP.deploy({value: parseUnits("1000", "gwei")});
  const challenge = await ethers.getContractAt("Fundraising", await setup.instance());

  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
  res = await exploit.exploit();
  await res.wait();
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
