const { parseEther, parseUnits, formatUnits } = require("ethers/lib/utils");
var path = require('path');
var scriptName = path.basename(__filename, '.js');
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function main() {
  const SETUP = await ethers.getContractFactory("contracts/" + scriptName + "/Setup.sol:Setup");
  const EXPLOIT = await ethers.getContractFactory("contracts/" + scriptName + "/Exploit.sol:Exploit");

  const setup = await SETUP.deploy({value: parseEther("9")});
  const challenge = await ethers.getContractAt("HauntedDungeon", await setup.instance());
  
  let abi = [
    "event Talk(address _to, string _text)",
    "event Stat(string, int)",
    "event Stat(string, uint)"
  ];

  console.log("solved:", await setup.isSolved());
  exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("10")});
  res = await (await exploit.exploit()).wait();


  let iface = new ethers.utils.Interface(abi);
  res.logs.forEach((log) => {
    res = iface.parseLog(log);
    if (res.name == 'Talk')
      console.log("\t\t", res.args[1]);
    else if (res.name == 'Stat')
      console.log("\t\t", res.args[0], formatUnits(res.args[1], "wei"));
  });
  console.log("solved:", await setup.isSolved());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
