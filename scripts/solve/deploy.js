const { parseEther } = require("ethers/lib/utils");
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function main() {

    let author;

    //0xmoostorm
    author = "0xmoostorm";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x5e40D0d98126323b81246008d386a93BA091704f");
    CHALLENGE = await ethers.getContractFactory("CollisionExchange");
    challenge = await CHALLENGE.attach("0xE442a00a4587677c945598e19DF41822e851c1DE");
    solved = await setup.isSolved();
    console.log(author, ": ", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address);
        console.log(author, ":", await setup.isSolved());
    }

    // BowTiedPickle
    author = "BowTiedPickle";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0xfF2c41d306098Ce69316C781137EaF05FABDFF6b");
    challenge = await ethers.getContractAt("Padlock", await setup.instance());
    if (challenge.address != "0xF8e8370A8d0a840DB47B2d52BEe5C549aD04809a")
    {
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
        console.log(author, ":", await setup.isSolved());
    }

    // ebaizel
    author = "ebaizel";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x5364B5A9e489b495CaAE4722e9706C817Cf54433");
    challenge = await ethers.getContractAt("PixelPavel", await setup.instance());
    if (challenge.address != "0x784B7A7A25ED38EF830AEFe7985c64f3AdF08346")
    {
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address);
        console.log(author, ":", await setup.isSolved());
    }

    // hack3r-0m
    author = "hack3r-0m";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0xA083913ed673b23dC5FB921b3909021CacFD794C");
    challenge = await ethers.getContractAt("BitMania", await setup.instance());
    if (challenge.address != "0x16051547CbaD42bBec882A7E9e6091796d0D1f50")
    {
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address);
        console.log(author, ":", await setup.isSolved());
    }

    // JustDravee
    author = "JustDravee";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x1f5c09a7d6a9B30b43DDDAABD384425DEe0ADe91");
    challenge = await ethers.getContractAt("SheerLocking", await setup.instance());
    if (challenge.address != "0xc7e13b9c94Eb3902Fa272E83Bb4D19392d09eF4d")
    {
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
        console.log(author, ":", await setup.isSolved());
    }

    // sidduHERE
    author = "sidduHERE";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x76BB80b4F1bA62eD2665f537f605C3593daCc458");
    challenge = await ethers.getContractAt("contracts/sidduHERE/ExampleQuizExploit.sol:ExampleQuizExploit", await setup.instance());
    if (challenge.address != "0x43c3E684cfCD27083f7156E7d883FC7e449e1c59")
    {
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
        await exploit.exploit();
        console.log(author, ":", await setup.isSolved());
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });