/*
 * SPDX-License-Identifier: Apache-2.0
 */



'use strict';

const {Contract} = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;

class fabcoin extends Contract {

    async getState(ctx, id) {
        // check whether the coin exists and who it belongs to 
        const stateJSON = await ctx.stub.getState(id);
        if (stateJSON && stateJSON.length > 0) {
            return `UTXO: ${id} doesn't exist`;
        }
        return JSON.parse(stateJSON.toString());
    }

    async mint(ctx, amount) {
        let cid = new ClientIdentity(ctx.stub);
        const minter = cid.getID();

        const clientMSPID = ctx.clientIdentity.getMSPID();
        // Check minter authorization - this sample assumes Org1 is the central banker with privilege to mint new tokens
        if (clientMSPID !== "Org1MSP") {
            throw new Error("Client is not authorized to mint new tokens");
        }
        if (amount <=0){
            throw new Error("Amount must be a positive number");
        }
        
        // Get ID of submitting client identity
        // const minter = ctx.clientIdentity.getID();
        const utxo = {
            Key: ctx.stub.getTxID() + ".0",
            Owner: minter,
            Amount: amount
        };

        let utxoCompositeKey= ctx.stub.createCompositeKey("utxo", [minter, utxo.Key])

        await ctx.stub.putState(utxoCompositeKey, Buffer.from(JSON.stringify(utxo)));

        return JSON.stringify(utxo)
    }


    /**
     * Spend UTXOs by transferring them to new owners.
     *
     * @param {Context} ctx - The transaction context.
     * @param {Array<string>} utxoInputKeys - The keys of the UTXOs to be spent.
     * @param {Array<[number, string]>} utxoOutputs - The new owners and amounts for the UTXOs to be created.
     */
    async spend(ctx, utxoInputKeys, utxoOutputs) {
        console.info('============= START : spend ===========');

        let cid = new ClientIdentity(ctx.stub);
        let spender = cid.getID();
        console.log(`The person trying to spend is ${spender}`); // should be the public key orx.509 certificate

        let totalInputAmount = 0

        // take the keys(txid.j) and get the compositeKey
        for (const inputKey of utxoInputKeys){
            // get the utxo and parse it
            let inputCompositeKey = ctx.stub.createCompositeKey("utxo", [spender, inputKey]);
            // try this
            const stateJSON = await ctx.stub.getState(inputCompositeKey);
            let utxo = JSON.parse(stateJSON.toString());
            // Check if the owner is the spender(person calling the spend function))
            if (utxo.Owner !== spender) {
                throw new Error(`The spender ${spender} is not the owner of the UTXO ${inputKey}`);
            }
            // add the amount that the input has
            totalInputAmount += utxo.Amount
            // delete that utxo
            // ctx.GetStub().DelState(utxoInputCompositeKey)
        }
        // if any of the above input transactions don't belong to the spender, then this will stop running
        
        let totalOutputAmount = 0;
        // check the amount that needs to be spent
        // if the amount is not equal, then it will throw an error
        for (const [amount, owner] of utxoOutputs) {
            if (amount<=0){
                throw new Error(`utxo output amount must be a positive integer `);
            }
            totalOutputAmount += amount;
        }
        if (totalInputAmount != totalOutputAmount) {
            throw new Error(`total utxoInput amount ${totalInputAmount} does not equal total utxoOutput amount ${totalOutputAmount}`)
        }

        // consume all the UTXOs that has been passed
        for (const inputKey of utxoInputKeys){
            let inputCompositeKey = ctx.stub.createCompositeKey("utxo", [spender, inputKey]);
            // get the utxo and parse it
            const stateJSON = await ctx.stub.getState(inputCompositeKey);
            let utxo = JSON.parse(stateJSON.toString());
            await ctx.stub.deleteState(inputKey)
        }

        let counter = 0
        // there should be a list of (amount, owner)
        for (const [amount, owner] of utxoOutputs) {
            // create a utxo and there should be one for each output
            const utxoOutput = {
                Key: ctx.stub.getTxID() + `.${counter}`,
                Owner: spender,
                Amount: amount
            };

            const utxoOutputCompositeKey = ctx.stub.createCompositeKey("utxo", [owner, utxoOutput.Key]);
            await ctx.stub.putState(utxoOutputCompositeKey, Buffer.from(amount.toString()));
            counter +=1;
        }
    
        
    }
    async getTransactions(ctx){
        // get the student id[]
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        let cid = new ClientIdentity(ctx.stub);
        const caller = cid.getID();
        console.log(`The caller of getTRansactions is the userID:${caller}`)

        return JSON.stringify(allResults);
    }
    
    /**
     * Retrieves the ID of the caller.
     *
     * @param {Object} ctx - the context object
     * @return {string} the ID of the caller
     */

    async getMyID(ctx) {
        let cid = new ClientIdentity(ctx.stub);
        const caller = cid.getID();
        return caller
    }

    async getClientUTXOs(ctx) {
        let cid = new ClientIdentity(ctx.stub);
        const caller = cid.getID();
        const clientMSPID = ctx.clientIdentity.getMSPID();


        const allResults = [];
        const iterator = ctx.stub.getStateByPartialCompositeKey("utxo", [owner]);
        let result = await iterator.next();

        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        console.log(`The caller of getClientUTXOs is the userID:${caller}`)

        return JSON.stringify(allResults);
    }

}


module.exports = fabcoin;
