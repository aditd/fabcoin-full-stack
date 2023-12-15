const network = require('../fabric/network.js');


exports.mintTokens = async (isOrg1, isOrg2, isMinter, userID, amount) => {
    // Connect to the blockchain network
    const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
    // Invoke the 'mint' function in the smart contract
    const contractRes = await network.invoke(networkObj, 'mint', amount);
    // Handle any errors that occur during the invocation
    if (contractRes.error|| networkObj.error) {
        return { status: contractRes.status, error: contractRes.error };
    }
    // Return success response
    return { status: 200, message: 'Success', data: contractRes };
}

exports.spendTokens = async (isOrg1, isOrg2, isMinter, userID, inputUTXOs, outputUTXOs) => {
    const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
    let contractRes;
    contractRes = await network.invoke(networkObj, 'spend', inputUTXOs, outputUTXOs);
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return status, error;
    }

    return 200, 'Success', contractRes;
    
}

exports.getAllUTXOs = async (isOrg1, isOrg2, isMinter, userID) => {
    // Connect to the blockchain network
    const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);

    // Query the 'getTransactions' function in the smart contract
    const contractRes = await network.query(networkObj, 'getTransactions');

    // Handle any errors that occur during the query
    if (contractRes.error) {
        return { status: contractRes.status, error: contractRes.error };
    }

    // Return success response
    return { status: 200, message: 'Success', data: contractRes };
}

exports.getClientUTXOs = async (isOrg1, isOrg2, isMinter, userID) => {
    // Connect to the blockchain network
    const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);

    // Query the 'getClientUTXOs' function in the smart contract
    const contractRes = await network.query(networkObj, 'getClientUTXOs');

    // Handle any errors that occur during the query
    if (contractRes.error) {
        return { status: contractRes.status, error: contractRes.error };
    }

    // Return success response
    return { status: 200, message: 'Success', data: contractRes };
}