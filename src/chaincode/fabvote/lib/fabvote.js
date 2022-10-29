/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Fabvote extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const admins = [
            {
                email: 'admin@gmai.com',
                password: 'admin'
            }
        ];
        for (let i = 0; i < admins.length; i++) {
            admins[i].docType = 'admin';
            admins[i].id = 'ADMIN' + i;
            await ctx.stub.putState(admins[i].id, Buffer.from(JSON.stringify(admins[i])));
            console.info('Added <-->', admins[i]);
        }

        // const positions = [
        //     {
        //         name: 'ĐB HĐND TP đà nẵng',
        //         maximum: 3,
        //         start_time: (new Date()).toLocaleString(),
        //         end_time: (new Date(new Date().getDate() + 1)).toLocaleString()
        //     }
        // ];
        // const ballots = [
        //     {
        //         ownerId: 'voter1',
        //         hasVoted: false
        //     }
        // ];

        // for (let i = 0; i < positions.length; i++) {
        //     positions[i].docType = 'position';
        //     await ctx.stub.putState('POSITION' + i, Buffer.from(stringify(positions[i])));
        //     console.info('Added <--> ', positions[i]);
        // }
        // for (let i = 0; i < ballots.length; i++) {
        //     ballots[i].docType = 'ballot';
        //     await ctx.stub.putState(uuidv4(), Buffer.from(stringify(ballots[i])));
        //     console.info('Added <--> ', ballots[i]);
        // }
        // console.info('============= END : Initialize Ledger ===========');
    }

    // Position
    async readPosition(ctx, id) {
        const positionAsBytes = await ctx.stub.getState(id); // get the car from chaincode state
        if (!positionAsBytes || positionAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(positionAsBytes.toString());
        return positionAsBytes.toString();
    }

    async createPosition(ctx, id, name, maximum, start_time, end_time) {
        console.info('============= START : Create Position ===========');
        const position = {
            docType: 'position',
            id: 'POSITION' + id,
            name,
            maximum,
            start_time: start_time,
            end_time: end_time
        };

        
        await ctx.stub.putState(position.id, Buffer.from(JSON.stringify(position)));
        // return JSON.stringify('dddd');
        console.info('============= END : Create Position ===========');
    }

    async readAllPositions(ctx) {
        const startKey = 'POSITION';
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

    async changePositionOwner(ctx, id, newOwner) {
        console.info('============= START : changePositionOwner ===========');

        const positionAsBytes = await ctx.stub.getState(id); // get the car from chaincode state
        if (!positionAsBytes || positionAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const car = JSON.parse(positionAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changePositionOwner ===========');
    }

    // Candidate
    async readCandidate(ctx, id) {
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
            id: 'CANDIDATE' + id,
            name,
            positionId,
            biography
        };

        await ctx.stub.putState(candidate.id, Buffer.from(JSON.stringify(candidate)));
        console.info('============= END : Create Candidate ===========');
    }

    async readAllCandidates(ctx) {
        const startKey = 'CANDIDATE';
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

    // ballot
    async readBallot(ctx, id) {
        const ballotAsBytes = await ctx.stub.getState(id); // get the ballot from chaincode state
        if (!ballotAsBytes || ballotAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        return ballotAsBytes.toString('utf8');
    }

    async readBallotsByOwner(ctx, ownerId) {
        let queryString = {};
		queryString.selector = {};
		queryString.selector.docType = 'ballot';
		queryString.selector.ownerId = ownerId;
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
    }

    async createBallot(ctx, id, ownerId, hasVoted = false) {
        console.info('============= START : Create ballot ===========');

        const ballot = {
            docType: 'ballot',
            id: 'BALLOT' + id,
            ownerId,
            hasVoted
        };

        await ctx.stub.putState(ballot.id, Buffer.from(JSON.stringify(ballot)));
        console.info('============= END : Create ballot ===========');
    }

    async readAllBallots(ctx) {
        const startKey = 'BALLOT';
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

    async votingAction(ctx, ownerId, votedCandidates) {
        ballots = await this.readBallotsByOwner(ctx, ownerId);
        if (!ballots && ballot.length === 0) {
            throw new Error(`You had voted !`)
        }
        results = JSON.parse(ballots);
        console.log(results[i]);
    }

    // async getKeyValue(ctx, ownerId) {
        
    // }

    // admin
    async readAdmin(ctx, id) {
        const adminAsBytes = await ctx.stub.getState(id);
        if (!adminAsBytes || adminAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        return adminAsBytes.toString(); 
    }

    async readAllAdmins(ctx) {
        const startKey = 'ADMIN';
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

    async createAdmin(ctx, id, gmail, password) {
        const exists = await this.assetExists(ctx, id);
        if (exists) {
            throw new Error(`The admin ${id} already exists`);
        }
        const admin = {
            id: 'ADMIN' + id,
            gmail: gmail, 
            password: password
        }
        await ctx.stub.putState(admin.id, Buffer.from(JSON.stringify(admin)));
    }

    // common function
    async assetExists(ctx, id) {
        const assetAsBytes = await ctx.stub.getState(id);
        return assetAsBytes && assetAsBytes.length > 0;
    }

    async deleteAsset(ctx, id) {
        const exists = await this.assetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // This is JavaScript so without Funcation Decorators, all functions are assumed
	// to be transaction functions
	//
	// For internal functions... prefix them with _
	async _GetAllResults(iterator, isHistory) {
		let allResults = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes = {};
				console.log(res.value.value.toString('utf8'));
				if (isHistory && isHistory === true) {
					jsonRes.TxId = res.value.txId;
					jsonRes.Timestamp = res.value.timestamp;
					try {
						jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Value = res.value.value.toString('utf8');
					}
				} else {
					jsonRes.Key = res.value.key;
					try {
						jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Record = res.value.value.toString('utf8');
					}
				}
				allResults.push(jsonRes);
			}
			res = await iterator.next();
		}
		iterator.close();
		return allResults;
	}

    async GetQueryResultForQueryString(ctx, queryString) {

		let resultsIterator = await ctx.stub.getQueryResult(queryString);
		let results = await this._GetAllResults(resultsIterator, false);

		return JSON.stringify(results);
	}
}

module.exports = Fabvote;
