const { parseEther, formatUnits } = require("ethers/lib/utils");
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
    challenge = await ethers.getContractAt("contracts/" + author + "/ExampleQuizExploit.sol:ExampleQuizExploit", await setup.instance());
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

    // iflp
    author = "iflp";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x38B500E61267Ee672c823bE3a8fA559236Bd1FD3");
    LOLLERCOASTER = await ethers.getContractFactory("Lollercoaster");
    lollercoaster = await LOLLERCOASTER.attach("0x25Be61724B64117DC9aC9DDd2A06B7DEc052D5cb");
    challenge = await ethers.getContractAt("contracts/" + author + "/ExampleQuizExploit.sol:ExampleQuizExploit", await setup.instance());
    if (challenge.address != "0x070Cd04E0Ab2bF1E10411f7aB1b0972164F72879")
    {
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
        res = await exploit.exploit();
        await res.wait();
        console.log(author, ":", await setup.isSolved());
    }

    // t-nero
    author = "t-nero";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x34e5EC7DA55039f332949a6d7dB506cD94594E12");
    challenge = await ethers.getContractAt("Monopoly", await setup.instance());
    if (challenge.address != "0x2488764643d43f974b3819dc14400543B3DF9904")
    {
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
        await (await exploit.play()).wait();
        console.log(author, ":", await setup.isSolved());
    }

    // agusduha
    author = "agusduha";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x459D9C80482c541deC1Aa491209EF598BF7c9344");
    challenge = await ethers.getContractAt("ERC1967Proxy", await setup.instance());
    if (challenge.address != "0x1020dFFD73141616fa7A931feE757DC9114B79D9")
    {
        console.log("address:", challenge.address);
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address);
        res = await exploit.exploit();
        await res.wait();
        console.log(author, ":", await setup.isSolved());
    }

    // mhchia
    author = "mhchia";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x6c06959586640De3BcdE69BDcEbF2efDa5d3983B");
    challenge = await ethers.getContractAt("CrowdFunding", await setup.instance());
    if (challenge.address != "0xC2c83168E3bf85A5DEabF25f9f9873085C201C79")
    {
        console.log("address:", challenge.address);
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
        res = await exploit.exploit();
        await res.wait();
        console.log(author, ":", await setup.isSolved());
    }

    // tqtsar
    author = "tqtsar";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x0dCb022a9927613f1B4B23F4F893515BA196c5c5");
    challenge = await ethers.getContractAt("Fundraising", await setup.instance());
    if (challenge.address != "0x44898e95E81600e7aD0a85F7e1A5daA987BC1365")
    {
        console.log("address:", challenge.address);
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
        res = await exploit.exploit();
        await res.wait();
        console.log(author, ":", await setup.isSolved());
    }

    // teryanarmen
    author = "teryanarmen";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0xAD392F2a981bDE60B43eC988a30ce2aE2d755eD2");
    challenge = await ethers.getContractAt("Challenge2", await setup.challenge());
    if (challenge.address != "0x8720D38BbC9212B8fD202BCcda07cff32b6F7920")
    {
        console.log("address:", challenge.address);
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("1")});
        await (await exploit.deploy()).wait();
        await (await exploit.destroy()).wait();
        await (await exploit.deploy()).wait();
        await (await exploit.destroy()).wait();
        console.log(author, ":", await setup.isSolved());
    }

    // Thro77le
    author = "Thro77le";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0xBF3e5530aB7Dcba712E3A7fA99463d46eb6a0c8e");
    challenge = await ethers.getContractAt("contracts/Thro77le/Challenge.sol:Challenge", await setup.challenge());
    if (challenge.address != "0xd9C72eD9DdeF04D0Ab88aE2403C383Ffbd11a71c")
    {
        console.log("address:", challenge.address);
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {   
        // generated with echidna
        ctf_seed = "51479216184425723975146308431218947475483327652822635706002660225093881707131";
        const factory = await ethers.getContractAt("Factory", await setup.factory());
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, formatUnits(ctf_seed, "wei"), factory.address, {value: parseEther("1")});
        console.log(author, ":", await setup.isSolved());
    }

    // ych18
    author = "ych18";
    SETUP = await ethers.getContractFactory("contracts/" + author + "/Setup.sol:Setup");
    setup = await SETUP.attach("0x40D1e6Fa69957f4c66461b8c8AB60108265F52b2");
    challenge = await ethers.getContractAt("FunnyChallenges", await setup.instance());
    if (challenge.address != "0x482b62c99e9eE97126b8a56828f105E07904fD03")
    {
        console.log("address:", challenge.address);
        throw("error");
    }
    solved = await setup.isSolved();
    console.log(author, ":", solved);

    if (!solved)
    {
        const EXPLOIT = await ethers.getContractFactory("contracts/" + author + "/Exploit.sol:Exploit");
        exploit = await EXPLOIT.deploy(challenge.address, {value: parseEther("2")});
        console.log(author, ":", await setup.isSolved());
    }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
