/*
 * SPDX-License-Identifier: Apache-2.0
 */



'use strict';

const {Contract} = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
const crypto = require('crypto');
const jsa =  require('jsrsasign')
let users =[];
let minters =[];

class fabcoin extends Contract {

    async mint(ctx, amount, publicKey) {
        console.info('============= START : MINT COINS ===========');

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
            Amount: amount,
            publicKey: publicKey // it belongs to this public key
        };

        let utxoCompositeKey= minter + utxo.Key

        console.log(utxoCompositeKey)
        await ctx.stub.putState(utxoCompositeKey, Buffer.from(JSON.stringify(utxo)));
        
        // await ctx.stub.putState("hello", "hi");
        console.log(`Minted ${amount} to ${minter}`);

        console.log(`${JSON.stringify(utxo)}`);
        users.push(minter)
        minters.push(minter)
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
        // Add all the input amounts and then check if these inputs really belong to the client
        for (const inputKey of utxoInputKeys){
            // get the utxo and parse it
            let inputCompositeKey = spender + inputKey;
            const exists = await this.assetExists(inputCompositeKey)
            let utxo = JSON.parse(stateJSON.toString());
            // Check if the owner is the spender(person calling the spend function))
            if (!exists) {
                throw new Error(`The spender ${spender} is not the owner of the UTXO ${inputKey}`);
            }
            // insure that all the public keys are the same
            // the signature of the transaction shoul be verifiable by the public key in the inputs

            // add the amount that the input has
            totalInputAmount += utxo.Amount
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
            let inputCompositeKey = spender + inputKey;
            // get the utxo and parse it
            const stateJSON = await ctx.stub.getState(inputCompositeKey);
            await ctx.stub.deleteState(inputCompositeKey)
        }

        let counter = 0
        // there should be a list of (amount, owner)
        // the owner needs to be a string
        for (const [amount, owner] of utxoOutputs) {
            // create a utxo and there should be one for each output
            const utxoOutput = {
                Key: ctx.stub.getTxID() + `.${counter}`,
                Owner: spender,
                Amount: amount
            };

            const utxoOutputCompositeKey = owner + utxoOutput.Key
            await ctx.stub.putState(utxoOutputCompositeKey, Buffer.from(amount.toString()));
            counter +=1;
            users.push(owner)
        }
        
    }
    
    async assetExists(ctx, key) {
        const asBytes = await ctx.stub.getState(key);
        return (!!asBytes && asBytes.length > 0);
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
        return JSON.stringify(allResults);
    }

    async getUsers(ctx){
        return JSON.stringify(users);
    }


    /**
     * Retrieves the ID of the caller.
     *
     * @param {Object} ctx - the context object
     * @return {string} the ID of the caller
     */

    async getState(ctx, id) {
        // check whether the coin exists and who it belongs to 
        const stateJSON = await ctx.stub.getState(id);
        if (stateJSON && stateJSON.length > 0) {
            return `UTXO: ${id} doesn't exist`;
        }
        return JSON.parse(stateJSON.toString());
    }
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
        const iterator = ctx.stub.getStateByPartialCompositeKey("utxo", [caller]);
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

    async registerUser(ctx) {
        let cid = new ClientIdentity();
        const caller = cid.getID();
        const clientMSPID = cid.getMSPID();
        users.push(caller)
    }
    async testUserStuff(ctx){
        let cid = new ClientIdentity();
        const caller = cid.getID();
        // cid.getAttributeValue()
        // let x509bytes = cid.getIDBytes()
        // ctx.stub.getArgs()
        let signature = new SignedProposal().signature
        let creator = new ProposalCreator().id_bytes
        const someData = {
            Signature: signature,
            Creator: id_bytes
        }
        // console.log(`X.509 bytes\n ${x509bytes}`)
        return JSON.stringify(someData)
    }
    
    async getSign(ctx){
        let cid = new ClientIdentity();
        const caller = cid.getID();
        // cid.getAttributeValue()
        // let x509bytes = cid.getIDBytes()
        // ctx.stub.getArgs()
        let signature = new SignedProposal().signature
        
        // console.log(`X.509 bytes\n ${x509bytes}`)
        return signature
    }
}


module.exports = fabcoin;
