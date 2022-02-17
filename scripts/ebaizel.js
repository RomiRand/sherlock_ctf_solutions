const { parseEther } = require("ethers/lib/utils");

async function main() {
  // const [owner, attacker, addr2] = await ethers.getSigners();
  const SETUP = await ethers.getContractFactory("contracts/ebaizel/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/ebaizel/Exploit.sol:Exploit");

  const setup = await SETUP.deploy({ value: 298 });
  const victim = await ethers.getContractAt(
    "PixelPavel",
    await setup.instance()
  );

  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(victim.address);
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
