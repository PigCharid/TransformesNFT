require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version:"0.8.18",
  },
  // contractSizer: {
  //   alphaSort: true,
  //   runOnCompile: true,
  //   disambiguatePaths: false,
  // },
  etherscan: {
    apiKey: {
      goerli: "MYBCKICTM5EQI2V9GJP4C8M1DWFWAHE3D4",
      bsc:"KN7DZWI4ZAEF2STC8STWJ9RTK9Y6FVMUNQ"
    }
  },
  networks: {
    bsc:{
      url:"https://rpc-bsc.48.club",
      chainId:56,
      accounts:["4f0cea06854583d99cc57202b6e6b080311a6b6d8077e63c0a2cbf35b6e84288"]
    },
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/Q1svh7bjqwrEd5tgBKY5fl5QFxeq3KsG",
      chainId:5,
      accounts:["c22c5fd4714f9b862eca82c8c270439813f6cb839dd4bff3b26b600e647e30ae"]
    },
  }
};