/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class CandidateCC extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const candidates = [
            {
                name: 'Nguyễn Hữu Thọ',
                positionId: 'POSITION 1',
                biography: 'Nice person'
            },
            {
                name: 'Nguyễn Phước Phúc',
                positionId: 'POSITION 1',
                biography: 'Nice person'
            },
            {
                name: 'Võ Quốc Khải',
                positionId: 'POSITION 1',
                biography: 'Nice person'
            },
        ];

        for (let i = 0; i < candidates.length; i++) {
            candidates[i].docType = 'candidate';
            await ctx.stub.putState('CANDIDATE' + i, Buffer.from(JSON.stringify(candidates[i])));
            console.info('Added <--> ', candidates[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCandidate(ctx, id) {
        const candidateAsBytes = await ctx.stub.getState(id); // get the candidate from chaincode state
        if (!candidateAsBytes || candidateAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(candidateAsBytes.toString());
        return candidateAsBytes.toString();
    }

    async createCandidate(ctx, id, name, positionId, biography) {
        console.info('============= START : Create Candidate ===========');

        const candidate = {
            docType: 'candidate',
            name,
            positionId,
            biography
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(candidate)));
        console.info('============= END : Create Candidate ===========');
    }

    async queryAllCandidates(ctx) {
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

    async changeCandidateName(ctx, id, newName) {
        console.info('============= START : changeCandidateName ===========');

        const candidateAsBytes = await ctx.stub.getState(id); // get the candidate from chaincode state
        if (!candidateAsBytes || candidateAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const candidate = JSON.parse(candidateAsBytes.toString());
        candidate.name = newName;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(candidate)));
        console.info('============= END : changeCandidateName ===========');
    }

}

module.exports = CandidateCC;
