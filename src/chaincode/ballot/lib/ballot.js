/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const { v4: uuidv4 } = require('uuid');


class BallotCC extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const ballots = [
            {
                ownerId: 'voter1',
                hasVoted: false
            },
            {
                ownerId: 'voter1',
                hasVoted: false
            },
            {
                ownerId: 'voter1',
                hasVoted: false
            },
        ];

        for (let i = 0; i < ballots.length; i++) {
            ballots[i].docType = 'ballot';
            await ctx.stub.putState(uuidv4(), Buffer.from(JSON.stringify(ballots[i])));
            console.info('Added <--> ', ballots[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryBallot(ctx, id) {
        const ballotAsBytes = await ctx.stub.getState(id); // get the ballot from chaincode state
        if (!ballotAsBytes || ballotAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(ballotAsBytes.toString());
        return ballotAsBytes.toString();
    }

    async createBallot(ctx, id, ownerId, hasVoted = false) {
        console.info('============= START : Create ballot ===========');

        const ballot = {
            docType: 'ballot',
            ownerId,
            hasVoted
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(ballot)));
        console.info('============= END : Create ballot ===========');
    }

    async queryAllBallots(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeBallotOwnerId(ctx, id, newOwnerId) {
        console.info('============= START : changeBallotOwnerId ===========');

        const ballotAsBytes = await ctx.stub.getState(id); // get the ballot from chaincode state
        if (!ballotAsBytes || ballotAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const ballot = JSON.parse(ballotAsBytes.toString());
        ballot.ownerId = newOwnerId;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(ballot)));
        console.info('============= END : changeBallotOwnerId ===========');
    }

}

module.exports = BallotCC;
