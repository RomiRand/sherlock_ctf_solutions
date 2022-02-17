const { parseEther } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");
  const LOLLERCOASTER = await ethers.getContractFactory("Lollercoaster");

  const setup = await SETUP.deploy({value: parseEther("1")});
  const lollercoaster = await LOLLERCOASTER.deploy();
  const challenge = await ethers.getContractAt(
    "contracts/" + scriptName + "/ExampleQuizExploit.sol:ExampleQuizExploit",
    await setup.instance()
  );
  await challenge.initialize(lollercoaster.address);

  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(challenge.address, lollercoaster.address, {value: parseEther("1")});
  await exploit.exploit();
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
