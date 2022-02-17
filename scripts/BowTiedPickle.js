const { parseEther } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");

  const setup = await SETUP.deploy();
  const victim = await ethers.getContractAt(
    "Padlock",
    await setup.instance()
  );

  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(victim.address, { value: parseEther("1")});
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
