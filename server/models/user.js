const network = require('../network.js');


exports.getUsers = async (isOrg1, isOrg2, isMinter, userID) => {
    try {
        const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);
        const contractRes = await network.query(networkObj, 'getUsers');

        if (contractRes.error) {
            return { status: contractRes.status, error: contractRes.error };
        }

        return { status: 200, message: 'Success', data: contractRes };
    } catch (error) {
        // Log the error and return a server error status
        console.error('Error in getUsers:', error);
        return { status: 500, error: 'Server error' };
    }
}


// exports.registerUser = async (isOrg1, isOrg2, isMinter, userID) => {
//     try {
//         await network.registerAndEnrollUser(isOrg1, isOrg2, userID);
//         const networkObj = await network.connect(isOrg1, isOrg2, isMinter, userID);

//         const contractRes = await network.invoke(networkObj, 'registerUser');
//         return { status: 200, message: 'Success', data: contractRes };
//     } catch (error) {
//         console.error('Error in registerUser:', error);
//         return { status: 500, error: 'Server error' };
//     }
// };
exports.registerUser = async (isOrg1, isOrg2, isMinter, userID) => {
    const result = await network.registerAndEnrollUser(isOrg1, isOrg2, userID);
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