require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        process.env.DEPLOYER_PK,
        process.env.VET_A_PK,
        process.env.VET_B_PK,
        process.env.OWNER_A_PK,
        process.env.OWNER_B_PK,
      ].filter(Boolean),
    },
  },
};