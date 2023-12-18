const network = require('../network.js');


exports.mintTokens = async (isOrg1, isOrg2, isMinter, userID, amount) => {
    try {
        const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
        const contractRes = await network.invoke(networkObj, 'mint', amount);
        return { status: 200, message: 'Tokens minted successfully', data: contractRes };
    } catch (error) {
        console.error('Error in mintTokens:', error);
        return { status: 500, error: 'Server error' };
    }
};

exports.spendTokens = async (isOrg1, isOrg2, isMinter, userID, spendData) => {
    try {
        const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
        const contractRes = await network.invoke(networkObj, 'spend', spendData);
        return { status: 200, message: 'Tokens spent successfully', data: contractRes };
    } catch (error) {
        console.error('Error in spendTokens:', error);
        return { status: 500, error: 'Server error' };
    }
};


exports.getClientUTXOs = async (isOrg1, isOrg2, isMinter, userID) => {
    try {
        const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
        const contractRes = await network.query(networkObj, 'getClientUTXOs');
        return { status: 200, message: 'Client UTXOs retrieved successfully', data: contractRes };
    } catch (error) {
        console.error('Error in getClientUTXOs:', error);
        return { status: 500, error: 'Server error' };
    }
};

exports.getAllUTXOs = async (isOrg1, isOrg2, isMinter, userID) => {
    try {
        const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
        const contractRes = await network.query(networkObj, 'getTransactions');
        return { status: 200, message: 'Transactions retrieved successfully', data: contractRes };
    } catch (error) {
        console.error('Error in getTransactions:', error);
        return { status: 500, error: 'Server error' };
    }
};
