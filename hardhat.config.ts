import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  networks: {
    goerli: {
      url:" https://eth-goerli.g.alchemy.com/v2/JJsoBMXxBUe6nnvM9Dk0m8aTkvAralTf",
      //@ts-ignore
      accounts: [process.env.PRIVATEKEY],
      coordinater: process.env.VRF_COORDINATOR,
     linkToken: process.env.LINK_TOKEN,
     hashKey: process.env.KEY_HASH,
     fee: process.env.KEY
     

    },
    // hardhat: {}
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
    

  },
}

export default config
