/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

let choice;
let userID;
process.argv.forEach(function (val, index, array) {
    userID = array[3];
    choice = array[2];
});

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        console.log(`wallet ${wallet.get(userID)}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userID);
        console.log(`wallet ${Object.getOwnPropertyNames(identity)}`);
        
        console.log(`${identity.credentials.certificate}`)

        if (!identity) {
            console.log(`An identity for the user ${userID} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userID, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcoin');

        if (choice === "getTransactions") {
            const result = await contract.evaluateTransaction('getTransactions');
            console.log(`getTransactions has been evaluated, result is: ${result.toString()}`);
        }

        if (choice === "testUserStuff") {
            const result = await contract.evaluateTransaction('testUserStuff');
            console.log(`getTransactions has been evaluated, result is: ${result.toString()}`);
        }
        if (choice === "getSign") {
            const result = await contract.evaluateTransaction('getSign');
            console.log(`getTransactions has been evaluated, result is: ${result.toString()}`);
        }

        if (choice === "getMyID") {
            const result = await contract.evaluateTransaction('getMyID');
            console.log(`getTransactions has been evaluated, result is: ${result.toString()}`);
        }
        if (choice === "getClientUTXOs") {
            const result = await contract.evaluateTransaction('getClientUTXOs');
            console.log(`getTransactions has been evaluated, result is: ${result.toString()}`);
        }  
        if (choice === "getState") {
            const result = await contract.evaluateTransaction('getState');
            console.log(`getTransactions has been evaluated, result is: ${result.toString()}`);
        }
        

        // Evaluate the specified transaction.
        // queryMsg transaction - requires 1 argument, ex: ('queryMsg', 'MSG0')
        // queryAllMsgs transaction - requires no arguments, ex: ('queryAllMsgs')
        // if (choice === "getTransactions") {
        //     const result = await contract.evaluateTransaction('getTransactions');
        //     console.log(`getTransactions has been evaluated, result is: ${result.toString()}`);
        // } else if(choice==="getValidUserTransactions"){
        //     const result = await contract.evaluateTransaction('getValidUserTransactions');
        //     console.log(`getValidUserTransactions has been evaluated, result is: ${result.toString()}`);
        // } else if(choice==="getPendingOutletTxn") {
        //     const result = await contract.evaluateTransaction('getPendingOutletTxn');
        //     console.log(`getPendingOutletTxn has been evaluated, result is: ${result.toString()}`);
        // }

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();