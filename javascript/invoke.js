/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

let userID, choice, outlet, date ;
process.argv.forEach(function (val, index, array) {
    choice = array[2];
    userID = array[3];
    date = array[4]
    outlet = array[5]
});

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userID);
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
        const contract = network.getContract('bphr');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        // await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        // await contract.submitTransaction('InitLedger');
        
        // await contract.submitTransaction('buyItem',"25-04-2023", "fuelzone", "JUICE");

        if (choice === 'InitLedger') {
            // await contract.submitTransaction('createMsg', msg, emailID, isAnonymous);
            await contract.submitTransaction('InitLedger');
            console.log(`${choice} Transaction has been submitted`);
        }
        if (choice === 'registerOutlet') {
            // await contract.submitTransaction('createMsg', msg, emailID, isAnonymous);
            await contract.submitTransaction('register', 'outlet');
            console.log(`${choice} Transaction has been submitted`);
        }
        
        if (choice==="buyItem") {
            await contract.submitTransaction('buyItem',date, outlet, "JUICE");
        }
        if (choice==="approveTxn") {
            await contract.submitTransaction('approveTxn', date);
        }

        if (choice === 'registerStudent') {
            // await contract.submitTransaction('createMsg', msg, emailID, isAnonymous);
            await contract.submitTransaction('register', 'student');
            console.log(`${choice} Transaction has been submitted`);
        }
        if (choice === 'InitLedger') {
            // await contract.submitTransaction('createMsg', msg, emailID, isAnonymous);
            await contract.submitTransaction('InitLedger');
            console.log(`${choice} Transaction has been submitted`);
        }
       
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();