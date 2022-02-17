const { parseEther } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');
console.log(scriptName);

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");

  const setup = await SETUP.deploy({ value: parseEther("1")});
  const victim = await ethers.getContractAt(
    "contracts/sidduHERE/ExampleQuizExploit.sol:ExampleQuizExploit",
    await setup.instance()
  );

  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(victim.address, { value: parseEther("1")});
  await exploit.exploit();
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
