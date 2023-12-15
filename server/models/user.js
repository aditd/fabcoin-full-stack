const network = require('../fabric/network.js');


exports.getUsers = async (isOrg1, isOrg2, isMinter, userID, inputUTXOs) => {
    const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
    let contractRes;
    contractRes = await network.query(networkObj, 'getUsers');
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return status, error;
    }
    return 200, 'Success', contractRes;
}

exports.registerUser = async (isOrg1, isOrg2, isMinter, userID, inputUTXOs) => {
    const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
    let contractRes;
    contractRes = await network.invoke(networkObj, 'registerUser');
    const error = networkObj.error || contractRes.error;
    if (error) {
        const status = networkObj.status || contractRes.status;
        return status, error;
    }
    return 200, 'Success', contractRes;
}