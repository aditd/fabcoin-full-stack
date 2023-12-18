const userModel = require('../models/user.js');


// export an async function called registerUser that calls tokenModel.registerUser

exports.registerUser = async (req,res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID } = req.body;

        // Validate request parameters
        if (!userID || !isOrg1 || !isOrg2  === undefined) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }

        // Call the mintTokens function from the model
        const result = userModel.registerUser(isOrg1, isOrg2, isMinter, userID);
        // Handle the response from the model
        if (result.error) {
            res.status(500).send({ message: 'Error registering user', error: result.error });
        } else {
            res.status(200).send({ message: 'User registered successfully', result });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID } = req.body;

        // Validate request parameters
        if (!userID || isOrg1 === undefined || isOrg2 === undefined) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }

        // Call the getUsers function from the model
        const result = await userModel.getUsers(isOrg1, isOrg2, isMinter, userID);

        // Handle the response from the model
        if (result.error) {
            res.status(result.status).send({ message: 'Error getting user', error: result.error });
        } else {
            res.status(200).send({ message: 'User received', data: result.data });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};
