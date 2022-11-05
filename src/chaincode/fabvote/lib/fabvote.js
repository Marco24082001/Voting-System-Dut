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
        const elections = [
            {
                name: 'Default election',
                start_time: (new Date()).toLocaleString(),
                end_time: (new Date(new Date().getDate() + 1)).toLocaleString(),
                active: false
            }
        ]
        for (let i = 0; i < admins.length; i++) {
            admins[i].docType = 'admin';
            admins[i].id = 'ADMIN' + i;
            await ctx.stub.putState(admins[i].id, Buffer.from(JSON.stringify(admins[i])));
            console.info('Added <-->', admins[i]);
        }

        for (let i = 0; i < admins.length; i++) {
            elections[i].docType = 'election';
            elections[i].id = 'ELECTION' + i;
            await ctx.stub.putState(admins[i].id, Buffer.from(JSON.stringify(elections[i])));
            console.info('Added <-->', elections[i]);
        }
    }

    // Election Configure
    async readElection(ctx, id) {
        const electionAsBytes = await ctx.stub.getState(id);
        if (!electionAsBytes || electionAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(positionAsBytes.toString());
        return positionAsBytes.toString();
    }

    async editElection(ctx, id, name, start_date, end_date, active) {
        console.info('============= START : editElection ===========');
        const electionAsBytes = await ctx.stub.getState(id);
        if (!electionAsBytes || electionAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const election = JSON.parse(electionAsBytes.toString());
        election.name = name;
        election.start_date = start_date
        election.end_date = end_date
        election.active = active
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(election)));
        console.info('============= END : editElection ===========');
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

    async createPosition(ctx, id, name, maximum) {
        console.info('============= START : Create Position ===========');
        const position = {
            docType: 'position',
            id: 'POSITION' + id,
            name,
            maximum,
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

    async editPosition(ctx, id, name, maximum) {
        console.info('============= START : editPosition ===========');
        const positionAsBytes = await ctx.stub.getState(id);
        if (!positionAsBytes || positionAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const election = JSON.parse(positionAsBytes.toString());
        election.name = name;
        election.maximum = maximum;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(election)));
        console.info('============= END : editPosition ===========');
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

    async createCandidate(ctx, id, name, positionId, image, biography) {
        console.info('============= START : Create Candidate ===========');

        const candidate = {
            docType: 'candidate',
            id: 'CANDIDATE' + id,
            name,
            image,
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
        const candidateAsBytes = await ctx.stub.getState(id);
        if (!candidateAsBytes || candidateAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const candidate = JSON.parse(candidateAsBytes.toString());
        candidate.name = newName;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(candidate)));
        console.info('============= END : changeCandidateName ===========');
    }

    async editCandidate(ctx, id, name, positionId, image, biography) {
        console.info('============= START : editCandidate ===========');
        const candidateAsBytes = await ctx.stub.getState(id);
        if (!candidateAsBytes || candidateAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const candidate = JSON.parse(candidateAsBytes.toString());
        candidate.name = name;
        candidate.positionId = positionId;
        candidate.image = image;
        candidate.biography = biography;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(candidate)));
        console.info('============= END : editCandidate ===========');
    }

    // voter
    async readVoter(ctx, id) {
        const voterAsBytes = await ctx.stub.getState(id);
        if (!voterAsBytes || voterAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        return voterAsBytes.toString('utf8');
    }

    async readAllVoters(ctx) {
        const startKey = 'VOTER';
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

    async createVoter(ctx, id, name, email, password, hasVoted=false) {
        console.info('============= START : Create voter ===========');
        const exists = await this.assetExists(ctx, id);
        if (exists) {
            throw new Error(`The voter ${id} already exists`);
        }
        const voter = {
            docType: 'voter',
            id: 'VOTER' + id,
            name,
            email,
            password,
            hasVoted
        };
        await ctx.stub.putState(voter.id, Buffer.from(JSON.stringify(voter)));
        console.info('============= END : Create voter ===========');
    }

    async editVoter(ctx, id, name, email, password, hasVoted) {
        console.info('============= START : editVoter ===========');
        const voterAsBytes = await ctx.stub.getState(id);
        if (!voterAsBytes || voterAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const voter = JSON.parse(voterAsBytes.toString());
        voter.name = name;
        voter.email = email;
        voter.biography = biography;
        voter.password = password;
        voter.hasVoted = hasVoted;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(voter)));
        console.info('============= END : editVoter ===========');
    }

    // ballot
    async readBallot(ctx, id) {
        const ballotAsBytes = await ctx.stub.getState(id);
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

    // async votingAction(ctx, ownerId, votedCandidates) {
    //     ballots = await this.readBallotsByOwner(ctx, ownerId);
    //     if (!ballots && ballot.length === 0) {
    //         throw new Error(`You had voted !`)
    //     }
    //     results = JSON.parse(ballots);
    //     console.log(results[i]);
    // }

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
