require("@nomiclabs/hardhat-waffle");
const config = require("./.config.json");

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
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    ethmainnet: {
      url: "https://eth-mainnet.alchemyapi.io/v2/xw2SnjqQ27EsIvBXB8Be6r19fMuqV7rr",
      accounts: [`${config.MAIN_PRIVATE_KEY}`]
    },
    matic: {
      url: "https://eth-mainnet.alchemyapi.io/v2/xw2SnjqQ27EsIvBXB8Be6r19fMuqV7rr",
      accounts: [`${config.MATIC_PRIVATE_KEY}`]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/VjqlOXyW6-H7WBCSMA4HznWy6i4keh8o`,
      accounts: [`${config.RINKEBY_PRIVATE_KEY}`]
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/n3IyFvGpB00v0bapUmMspjItMHGMUG9k",
      accounts: [`${config.MUMBAI_PRIVATE_KEY}`]
    }
  },
};
