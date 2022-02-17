const { parseEther } = require("ethers/lib/utils");

async function main() {
  // const [owner, attacker, addr2] = await ethers.getSigners();
  const SETUP = await ethers.getContractFactory("contracts/0xNazgul/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/0xNazgul/Exploit.sol:Exploit");

  const setup = await SETUP.deploy({ value: parseEther("1") });
  const col_exchange = await ethers.getContractAt(
    "CollisionExchange",
    await setup.exchange()
  );

  const book = await ethers.getContractAt(
    "OrderBook",
    await setup.orderBook()
  );

  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(col_exchange.address);
  //await exploit.finalize();
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
