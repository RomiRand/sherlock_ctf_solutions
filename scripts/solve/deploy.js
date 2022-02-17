const { parseEther } = require("ethers/lib/utils");
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function main() {
    
    const SETUP = await ethers.getContractFactory("contracts/0xmoostorm/Setup.sol:Setup");
    const setup = await SETUP.attach("0x5e40D0d98126323b81246008d386a93BA091704f");
    const COL_EXCHANGE = await ethers.getContractFactory("CollisionExchange");
    const col_exchange = await COL_EXCHANGE.attach("0xE442a00a4587677c945598e19DF41822e851c1DE");
    const solved = await setup.isSolved();
    console.log(solved);

    // exploit
    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/0xmoostorm/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(col_exchange.address);
        console.log(await setup.isSolved());
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
