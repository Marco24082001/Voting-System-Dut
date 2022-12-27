const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

class Contract {
  async init() {
    try {
      // ORG1
      const ccpPathOrg1 = path.resolve(process.cwd(), '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
      const ccpOrg1 = JSON.parse(fs.readFileSync(ccpPathOrg1, 'utf8'));
      // Create a new file system based wallet for managing identities.
      const walletPathOrg1 = path.join(process.cwd(), 'wallet');
      const walletOrg1 = await Wallets.newFileSystemWallet(walletPathOrg1);
      // Check to see if we've already enrolled the user.
      const identityOrg1 = await walletOrg1.get('appUserOrg1');
      if (!identityOrg1) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
      }
      // Create a new gateway for connecting to our peer node.
      const gatewayOrg1 = new Gateway();
      await gatewayOrg1.connect(ccpOrg1, { wallet: walletOrg1, identity: 'appUserOrg1', discovery: { enabled: true, asLocalhost: true } });
      // Get the network (channel) our contract is deployed to.
      const networkOrg1 = await gatewayOrg1.getNetwork('fabvotechannel');
      this.contractOrg1 = networkOrg1.getContract('fabvote');

      // ORG2
      const ccpPathOrg2 = path.resolve(process.cwd(), '..', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
      const ccpOrg2 = JSON.parse(fs.readFileSync(ccpPathOrg2, 'utf8'));
      // Create a new file system based wallet for managing identities.
      const walletPathOrg2 = path.join(process.cwd(), 'wallet');
      const walletOrg2 = await Wallets.newFileSystemWallet(walletPathOrg2);
      // Check to see if we've already enrolled the user.
      const identityOrg2 = await walletOrg2.get('appUserOrg2');
      if (!identityOrg2) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
      }
      // Create a new gateway for connecting to our peer node.
      const gatewayOrg2 = new Gateway();
      await gatewayOrg2.connect(ccpOrg2, { wallet: walletOrg2, identity: 'appUserOrg2', discovery: { enabled: true, asLocalhost: true } });
      // Get the network (channel) our contract is deployed to.
      const networkOrg2 = await gatewayOrg2.getNetwork('fabvotechannel');
      this.contractOrg2 = networkOrg2.getContract('fabvote');
    } catch (err) {
      console.log(err);
    }
  }

  async query_transaction(role, invoke_name, ...args) {
    if (role === 'admin') {
      return await this.contractOrg1.evaluateTransaction(invoke_name, ...args);
    } else if (role === 'voter') {
      return await this.contractOrg2.evaluateTransaction(invoke_name, ...args);
    } else {
      return await this.contractOrg1.evaluateTransaction(invoke_name, ...args);
    }
  }

  async logic_transaction(role, invoke_name, ...args) {
    if (role === 'admin') {
      return await this.contractOrg1.submitTransaction(invoke_name, ...args);
    } else if (role === 'voter') {
      return await this.contractOrg2.submitTransaction(invoke_name, ...args);
    } else {
      return await this.contractOrg1.submitTransaction(invoke_name, ...args);
    }
  }
}


// const ContractService = new Contract();
module.exports = {
  Contract: Contract
}

// export default new Contract();

// async function initGateway() {
//   try {
//     const ccpPath = path.resolve(process.cwd(), '..', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
//     const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

//     // Create a new file system based wallet for managing identities.
//     const walletPath = path.join(process.cwd(), 'wallet');
//     const wallet = await Wallets.newFileSystemWallet(walletPath);
//     // Check to see if we've already enrolled the user.
//     const identity = await wallet.get('appUserOrg2');
//     if (!identity) {
//       console.log('An identity for the user "appUser" does not exist in the wallet');
//       console.log('Run the registerUser.js application before retrying');
//       return;
//     }
//     // Create a new gateway for connecting to our peer node.
//     await gateway.connect(ccp, { wallet, identity: 'appUserOrg2', discovery: { enabled: true, asLocalhost: true } });
//   } catch (err) {
//     console.log(err);
//   }
// }

// initGateway();


// module.exports = {
//   gateway
// }


// /*
//  * Copyright IBM Corp. All Rights Reserved.
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */

// 'use strict';

// const { Gateway, Wallets } = require('fabric-network');
// const fs = require('fs');
// const path = require('path');

// async function main() {
//     try {
//         // load the network configuration
//         const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser');
//         if (!identity) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }

//         // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');

//         // Get the contract from the network.
//         const contract = network.getContract('fabcar');

//         // Submit the specified transaction.
//         // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
//         // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
//         await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
//         console.log('Transaction has been submitted');

//         // Disconnect from the gateway.
//         await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to submit transaction: ${error}`);
//         process.exit(1);
//     }
// }

// main();
