const tokenModel = require('../models/token.js');


exports.mintTokens = async (req, res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID, amount } = req.body;
        if (!userID || amount === undefined) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }
        const result = await tokenModel.mintTokens(isOrg1, isOrg2, isMinter, userID, amount);
        res.status(result.status).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}

exports.spendTokens = async (req, res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID, spendData } = req.body;
        if (!userID || !spendData) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }
        const result = await tokenModel.spendTokens(isOrg1, isOrg2, isMinter, userID, JSON.stringify(spendData));
        res.status(result.status).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}


exports.getAllUTXOs = async (req, res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID } = req.body;
        if (!userID) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }
        const result = await tokenModel.getAllUTXOs(isOrg1, isOrg2, isMinter, userID);
        res.status(result.status).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}

exports.getClientUTXOs = async (req, res) => {
    try {
        const { isOrg1, isOrg2, isMinter, userID } = req.body;
        // const userid = req.params.userid;

        if (!userID) {
            return res.status(400).send({ message: 'Missing required parameters' });
        }
        const result = await tokenModel.getClientUTXOs(isOrg1, isOrg2, isMinter, userID);
        res.status(result.status).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
}