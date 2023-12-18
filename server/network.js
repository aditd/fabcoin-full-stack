
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('./javascript/CAUtil.js');
const { buildCCPOrg1,buildCCPOrg2, buildWallet } = require('./javascript/AppUtil.js');


// const minter_addr="https://localhost:7054"
// const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');

async function getConnectionMaterial(isOrg1, isOrg2, userID) {
    const connectionMaterial = {};
    let ccpPath;
    if(isOrg1){
        ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        connectionMaterial.orgMSPID = "Org1MSP"
    }
    if(isOrg2){
        ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
        connectionMaterial.orgMSPID = "Org2MSP"
    }
    console.log(`Current process working directory: ${process.cwd()}`);
    const walletPath = path.join(process.cwd(), 'wallet');
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // Create a new file system based wallet for managing identities.
    // const walletPath = path.join(__dirname, 'wallet');
    
    connectionMaterial.connection = ccp
    connectionMaterial.walletPath = walletPath

    return connectionMaterial;
}

exports.connect = async (isOrg1, isOrg2, isMinter, userID) => {
    console.log(`\n\N *** CONNECTING ***\n`)
    const gateway = new Gateway();

    try {
        const { walletPath, connection } = await getConnectionMaterial(isOrg1, isOrg2, userID);
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        await gateway.connect(connection, { wallet, identity: userID,
            discovery: { enabled: true, asLocalhost: true },
        });
        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('fabcoin');
        console.log('Connected to fabric network successfully.');

        const networkObj = { gateway, network, contract };

        return networkObj;
    } catch (err) {
        console.error(`\nFail to connect network: ${err}`);
        await gateway.disconnect();
        return { status: 500, error: err.toString() };
    }
};

exports.query = async (networkObj, ...funcAndArgs) => {
    console.log(`\n\N *** QUERYING: ${funcAndArgs} ***\n`)
    try {
        console.log(`Query parameter: ${funcAndArgs}`);
        const funcAndArgsStrings = funcAndArgs.map(elem => String(elem));
        const response = await networkObj.contract.evaluateTransaction(...funcAndArgsStrings);
        console.log(`Transaction ${funcAndArgs} has been evaluated: ${response.toString()}`);
        return response.toString();
    } catch (err) {
        console.error(`Failed to evaluate transaction: ${err}`);
        return { status: 500, error: err.toString() };
    } finally {
        if (networkObj.gateway) {
            await networkObj.gateway.disconnect();
        }
    }
};

exports.invoke = async (networkObj, ...funcAndArgs) => {
    console.log(`\n\N *** INVOKING: ${funcAndArgs} ***\n`)
    try {
        console.log(`Invoke parameter: ${funcAndArgs}`);
        const funcAndArgsStrings = funcAndArgs.map(elem => String(elem));
        const response = await networkObj.contract.submitTransaction(...funcAndArgsStrings);
        console.log(`Transaction ${funcAndArgs} has been submitted: ${response.toString()}`);

        return JSON.parse(response.toString());
    } catch (err) {
        console.error(`Failed to submit transaction: ${err}`);
        return { status: 500, error: err.toString() };
    } finally {
        if (networkObj.gateway) {
            await networkObj.gateway.disconnect();
        }
    }
};


exports.enrollAdmin = async (isOrg1, isOrg2) => {
    console.log(`\n\N *** ADMIN ENROLLMENT ***\n`)
    const mspOrg1 = 'Org1MSP';
    const mspOrg2 = 'Org2MSP';
    const walletPath = path.join(__dirname, 'wallet');
    if (isOrg1) {
        try {
            // build an in memory object with the network configuration (also known as a connection profile)
            const ccp = buildCCPOrg1();
            // build an instance of the fabric ca services client based on
            // the information in the network configuration
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
            // setup the wallet to hold the credentials of the application user
            const wallet = await buildWallet(Wallets, walletPath);
            // in a real application this would be done on an administrative flow, and only once
            await enrollAdmin(caClient, wallet, mspOrg1);
        } catch (error) {
            console.error(`******** FAILED to run the application: ${error}`);
            process.exit(1);
        }
    } 
    if (isOrg2) {
        try {
            // build an in memory object with the network configuration (also known as a connection profile)
            const ccp = buildCCPOrg2();
            // build an instance of the fabric ca services client based on
            // the information in the network configuration
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org2.example.com');
            // setup the wallet to hold the credentials of the application user
            const wallet = await buildWallet(Wallets, walletPath);
            // in a real application this would be done on an administrative flow, and only once
            await enrollAdmin(caClient, wallet, mspOrg2);
        } catch (error) {
            console.error(`******** FAILED to run the application: ${error}`);
            process.exit(1);
        }
    }
    

}

exports.registerAndEnrollUser = async (isOrg1, isOrg2, userID) => {
    console.log(`\n\N *** REGISTER AND ENROLLING USER: ${userID} ***\n`)
    const mspOrg1 = 'Org1MSP';
    const mspOrg2 = 'Org2MSP';
    const walletPath = path.join(__dirname, 'wallet');

    if (isOrg1) {
        try {
            // build an in memory object with the network configuration (also known as a connection profile)
            const ccp = buildCCPOrg1();
            // build an instance of the fabric ca services client based on
            // the information in the network configuration
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
            // setup the wallet to hold the credentials of the application user
            const wallet = await buildWallet(Wallets, walletPath);
            // in a real application this would be done only when a new user was required to be added
            // and would be part of an administrative flow
            await registerAndEnrollUser(caClient, wallet, mspOrg1, userID, 'org1.department1');
        } catch (error) {
            console.error(`Failed to register user ${userID}: ${error}`);
            process.exit(1);
        }
    } 
    if (isOrg2) {
        try {
            // build an in memory object with the network configuration (also known as a connection profile)
            const ccp = buildCCPOrg2();
            // build an instance of the fabric ca services client based on
            // the information in the network configuration
            const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org2.example.com');
            // setup the wallet to hold the credentials of the application user
            const wallet = await buildWallet(Wallets, walletPath);
            // in a real application this would be done only when a new user was required to be added
            // and would be part of an administrative flow
            await registerAndEnrollUser(caClient, wallet, mspOrg2, userID, 'org2.department1');
        } catch (error) {
            console.error(`Failed to register user ${userID}: ${error}`);
            process.exit(1);
        }
    }
}