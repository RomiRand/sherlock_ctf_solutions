const { parseEther } = require("ethers/lib/utils");

async function main() {
  // const [owner, attacker, addr2] = await ethers.getSigners();
  const SETUP = await ethers.getContractFactory("contracts/sidduHERE/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/sidduHERE/Exploit.sol:Exploit");

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
