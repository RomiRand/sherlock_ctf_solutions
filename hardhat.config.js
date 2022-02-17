require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const SHERLOCK_CTF_KEY = process.env.SHERLOCK_CTF_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.0",
      },
      {
        version: "0.7.2",
      },
      {
        version: "0.7.3",
      },
      {
        version: "0.7.4",
      },
      {
        version: "0.7.6",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.8.4",
      },
      {
        version: "0.8.7",
      },
      {
        version: "0.8.9",
      },
      {
        version: "0.8.11",
      },
    ],
  },
  networks: {
    sherlock: {
      url: `https://ctf.sherlock.xyz/${SHERLOCK_CTF_KEY}`,
      //gasPrice: 900000000000,
      accounts: [PRIVATE_KEY].filter((item) => item !== ""),
    },
  },
};
