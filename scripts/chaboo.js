const { parseEther } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");

  const setup = await SETUP.deploy({value: parseEther("1")});
  const challenge = await ethers.getContractAt("SwissTreasury", await setup.instance());

  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(challenge.address);
  await (await exploit.exploit()).wait();
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
