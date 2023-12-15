const tokenModel = require('../models/token.js');


exports.mintTokens = async (req,res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID, amount } = req.body;

        // Validate request parameters
        if (!userID || amount === undefined) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }

        // Call the mintTokens function from the model
        const result = await tokenModel.mintTokens(isOrg1, isOrg2, isMinter, userID, amount);

        // Handle the response from the model
        if (result.error) {
            res.status(500).send({ message: 'Error minting tokens', error: result.error });
        } else {
            res.status(200).send({ message: 'Tokens minted successfully', result });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}   

exports.spendTokens = async (req,res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID, inputUTXOs, outputUTXOs } = req.body;

        // Validate request parameters
        if (!userID || inputUTXOs ||outputUTXOs  === undefined) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }

        // Call the mintTokens function from the model
        const result = await tokenModel.spendTokens(isOrg1, isOrg2, isMinter, userID, inputUTXOs, outputUTXOs);

        // Handle the response from the model
        if (result.error) {
            res.status(500).send({ message: 'Error spending tokens', error: result.error });
        } else {
            res.status(200).send({ message: 'Tokens sent successfully', result });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }

}

exports.getAllUTXOs = async (req,res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID } = req.body;

        // Validate request parameters
        if (!userID === undefined) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }

        // Call the mintTokens function from the model
        const result = await tokenModel.getAllUTXOs(isOrg1, isOrg2, isMinter, userID);

        // Handle the response from the model
        if (result.error) {
            res.status(500).send({ message: 'Error getting all tokens', error: result.error });
        } else {
            res.status(200).send({ message: 'Tokens received:', result });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }

}

exports.getClientUTXOs = async (req,res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID } = req.body;

        // Validate request parameters
        if (!userID === undefined) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }

        // Call the mintTokens function from the model
        const result = await tokenModel.getClientUTXOs(isOrg1, isOrg2, isMinter, userID);

        // Handle the response from the model
        if (result.error) {
            res.status(500).send({ message: 'Error getting client tokens', error: result.error });
        } else {
            res.status(200).send({ message: 'Tokens received:', result });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}