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
                password: 'adminpw'
            }
        ];
        const elections = [
            {
                name: 'Default election',
                start_date: (new Date()).toLocaleString(),
                duration: 30
            }
        ];
        const positions = [
            {
                id: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                name: 'Đại biểu quốc hội khóa XV',
                maximum: 3,
            },
            {
                id: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                name: 'Đại biểu HĐND tỉnh Lai Châu',
                maximum: 3,
            }
        ];
        const candidates = [
            {
                id: 'CANDIDATEab290e12-6269-11ed-9b6a-0242ac120002',
                name: 'Lê Trường Lưu',
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                biography: 'Uỷ viên BCH TW Đảng,Bí Thư Tỉnh uỷ, Trưởng Đoàn ĐBQH tỉnh, Chủ tịch HĐND tỉnh Thừa Thiên Huế.',
                imageUrl: 'https://thuathienhue.gov.vn/Portals/0/Organization/Avatar/Le%20Truong%20Luu.jpg',
            },
            {
                id: 'CANDIDATE40844e72-626a-11ed-9b6a-0242ac120002',
                name: 'Nguyễn Thị Sửu',
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                biography: 'Tỉnh ủy viên, Phó Trưởng đoàn chuyên trách Đoàn ĐBQH tỉnh, Ủy viên Hội đồng Dân tộc của Quốc hội.',
                imageUrl: 'http://dbqh.thuathienhue.gov.vn/Portals/0/ntsuu.png',
            },
            {
                id: 'CANDIDATE720eca27-43ba-4e75-90d4-f8e44f8999e4',
                name: 'Lê Hoài Trung',
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                biography: 'Ủy viên BCH TW Đảng, Trưởng ban Ban Đối Ngoại Trung ương, Ủy viên Ủy ban Quốc phòng - An ninh của Quốc hội.',
                imageUrl: 'http://dbqh.thuathienhue.gov.vn/Portals/0/lhtrung.png',
            },
            {
                id: 'CANDIDATE07ba10b3-b370-491d-9094-d41fc421c6d0',
                name: 'Phạm Trường Sơn',
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                biography: 'Thiếu tướng, Phó Tư lệnh Quân chủng Phòng không - Không quân, Bộ Quốc phòng,',
                imageUrl: 'http://dbqh.thuathienhue.gov.vn/Portals/0/ptson.png',
            },
            {
                id: 'CANDIDATE42ca8ce5-cab1-498f-ab88-d31c6c1e41fd',
                name: 'Phạm Như Hiệp',
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                biography: 'Tỉnh ủy viên, Bí thư Đảng ủy, GĐ Bệnh viện TW Huế.',
                imageUrl: 'http://dbqh.thuathienhue.gov.vn/Portals/0/pnhiep.png',
            },
            {
                id: 'CANDIDATE7f7b209b-1524-4198-b6d4-1345ed1af062',
                name: 'Nguyễn Thanh Hải',
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                biography: 'Tỉnh ủy viên, Viện trưởng Viện Kiểm sát nhân dân tỉnh Thừa Thiên Huế.',
                imageUrl: 'http://dbqh.thuathienhue.gov.vn/Portals/0/nthai.png',
            },
            {
                id: 'CANDIDATEdab39660-856d-40c1-a32d-a6707cb76fca',
                name: 'Phạm Như Hiệp',
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                biography: 'Tỉnh ủy viên, Giám đốc Bệnh viện Trung ương Huế, Giám đốc Trung tâm Ung bướu, Trưởng khoa Ngoại nhi - Cấp cứu bụng.',
                imageUrl: 'http://dbqh.thuathienhue.gov.vn/Portals/0/Users/002/02/2/PhamNhuHiep.JPG',
            },
            {
                id: 'CANDIDATE019ebac8-768f-4699-8225-904995c4fb4a',
                name: 'Nguyễn Chí Tài',
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                biography: 'Ủy viên Ban Thường vụ Tỉnh ủy, Trưởng ban Dân vận Tỉnh ủy, Phó Trưởng Đoàn đại biểu Quốc hội tỉnh Thừa Thiên Huế.',
                imageUrl: 'http://dbqh.thuathienhue.gov.vn/Portals/0/Users/002/02/2/NguyenChiTai.JPG',
            },
        ];

        const voters = [
            {
                id: "VOTERba6c2f71-a952-4310-9cb0-8a5d34672eb1",
                name: "Le Van Thanh Nhan",
                email: "nhanle@gmail.com",
                password: "123123aa",
                voted: "false",
                verified: "true",
            },
            {
                id: "VOTERfa966e44-b321-4955-88ac-797633288deb",
                name: "Le Quang Loc",
                email: "quangloc@gmail.com",
                password: "123123aa",
                voted: "false",
                verified: "true",
            },
            {
                id: "VOTER6e408fdb-ba57-42ca-b06a-6dd8f9c0b3e6",
                name: "Hoa Nhan Thuy",
                email: "hoathuy@gmail.com",
                password: "123123aa",
                voted: "false",
                verified: "true",
            },
            
        ];

        const votes = [
            {
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE019ebac8-768f-4699-8225-904995c4fb4a',
            },
            {
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE019ebac8-768f-4699-8225-904995c4fb4a',
            },
            {
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE019ebac8-768f-4699-8225-904995c4fb4a',
            },
            {
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE019ebac8-768f-4699-8225-904995c4fb4a',
            },
            {
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE019ebac8-768f-4699-8225-904995c4fb4a',
            },
            {
                positionId: 'POSITION28d37c18-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE019ebac8-768f-4699-8225-904995c4fb4a',
            },
            {
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE7f7b209b-1524-4198-b6d4-1345ed1af062',
            },
            {
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE7f7b209b-1524-4198-b6d4-1345ed1af062',
            },
            {
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE7f7b209b-1524-4198-b6d4-1345ed1af062',
            },
            {
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE7f7b209b-1524-4198-b6d4-1345ed1af062',
            },
            {
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE7f7b209b-1524-4198-b6d4-1345ed1af062',
            },
            {
                positionId: 'POSITION05c4fe86-6269-11ed-9b6a-0242ac120002',
                ownerId: 'CANDIDATE7f7b209b-1524-4198-b6d4-1345ed1af062',
            },
        ]
        for (let i = 0; i < admins.length; i++) {
            admins[i].docType = 'admin';
            admins[i].id = 'ADMIN' + i;
            await ctx.stub.putState(admins[i].id, Buffer.from(JSON.stringify(admins[i])));
            console.info('Added <-->', admins[i]);
        }

        for (let i = 0; i < elections.length; i++) {
            elections[i].docType = 'election';
            elections[i].id = 'ELECTION' + i;
            await ctx.stub.putState(elections[i].id, Buffer.from(JSON.stringify(elections[i])));
            console.info('Added <-->', elections[i]);
        }

        for (let i = 0; i < positions.length; i++) {
            positions[i].docType = 'position';
            await ctx.stub.putState(positions[i].id, Buffer.from(JSON.stringify(positions[i])));
            console.info('Added <-->', positions[i]);
        }

        for (let i = 0; i < candidates.length; i++) {
            candidates[i].docType = 'candidate';
            await ctx.stub.putState(candidates[i].id, Buffer.from(JSON.stringify(candidates[i])));
            console.info('Added <-->', candidates[i]);
        }

        for (let i = 0; i < voters.length; i++) {
            voters[i].docType = 'voter';
            await ctx.stub.putState(voters[i].id, Buffer.from(JSON.stringify(voters[i])));
            console.info('Added <-->', voters[i]);
        }
        
        // for (let i = 0; i < votes.length; i++) {
        //     votes[i].docType = 'vote';
        //     votes[i].id = 'VOTES' + i;
        //     await ctx.stub.putState(votes[i].id, Buffer.from(JSON.stringify(votes[i])));
        //     console.info('Added <-->', votes[i]);
        // }
    }

    // Election Configure
    async readAllElections(ctx) {
        const startKey = 'ELECTION';
        const endKey = 'ELECTIONz';
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
            allResults.push(record);
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }


    async editElection(ctx, id, name, start_date, duration) {
        console.info('============= START : editElection ===========');
        const electionAsBytes = await ctx.stub.getState(id);
        if (!electionAsBytes || electionAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const election = JSON.parse(electionAsBytes.toString());
        election.name = name;
        election.start_date = start_date
        election.duration = parseInt(duration)
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(election)));
        console.info('============= END : editElection ===========');
    }

    async resetElection(ctx) {
        const assets = JSON.parse(await this.readAllAssets(ctx));
        for(const asset of assets) {
            if( (asset.id.includes('ADMIN') == false) && (asset.id.includes('ELECTION') == false)){
                await this.deleteAsset(ctx, asset.id);
            }
            // await this.deleteAsset(ctx, asset.id);
        }
        return 'true'
    }

    // Position
    async readPosition(ctx, id) {
        const positionAsBytes = await ctx.stub.getState(id); // get the car from chaincode state
        if (!positionAsBytes || positionAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        return positionAsBytes.toString();
    }

    async createPosition(ctx, id, name, maximum) {
        console.info('============= START : Create Position ===========');
        maximum = parseInt(maximum);
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
        const endKey = 'POSITIONz';
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
            allResults.push(record);
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
        const position = JSON.parse(positionAsBytes.toString());
        position.name = name;
        position.maximum = parseInt(maximum);
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(position)));
        console.info('============= END : editPosition ===========');
    }


    // Candidate
    async readCandidate(ctx, id) {
        const candidateAsBytes = await ctx.stub.getState(id); // get the candidate from chaincode state
        if (!candidateAsBytes || candidateAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        return candidateAsBytes.toString();
    }

    async createCandidate(ctx, id, name, positionId, biography, imageUrl) {
        console.info('============= START : Create Candidate ===========');
        const candidate = {
            docType: 'candidate',
            id: 'CANDIDATE' + id,
            name,
            positionId,
            biography,
            imageUrl,
        };
        await ctx.stub.putState(candidate.id, Buffer.from(JSON.stringify(candidate)));
        console.info('============= END : Create Candidate ===========');
    }

    async readAllCandidates(ctx) {
        const startKey = 'CANDIDATE';
        const endKey = 'CANDIDATEz';
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
            allResults.push(record);
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async readCandidatesByPositionId(ctx, positionId) {
        let queryString = {};
		queryString.selector = {};
		queryString.selector.docType = 'candidate';
		queryString.selector.positionId = positionId;
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
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

    async editCandidate(ctx, id, name, positionId, biography, imageUrl) {
        console.info('============= START : editCandidate ===========');
        const candidateAsBytes = await ctx.stub.getState(id);
        if (!candidateAsBytes || candidateAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const candidate = JSON.parse(candidateAsBytes.toString());
        candidate.name = name;
        candidate.positionId = positionId;
        candidate.imageUrl = imageUrl;
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
        const endKey = 'VOTERz';
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
            allResults.push(record);
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async createVoter(ctx, id, name, email, password, voted="false", verified="false") {
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
            voted,
            verified,
        };
        await ctx.stub.putState(voter.id, Buffer.from(JSON.stringify(voter)));
        console.info('============= END : Create voter ===========');
    }

    async editVoter(ctx, id, name, email, password, voted, verified) {
        console.info('============= START : editVoter ===========');
        const voterAsBytes = await ctx.stub.getState(id);
        if (!voterAsBytes || voterAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        const voter = JSON.parse(voterAsBytes.toString());
        voter.name = name;
        voter.email = email;
        voter.password = password;
        voter.voted = voted;
        voter.verified = verified;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(voter)));
        console.info('============= END : editVoter ===========');
    }

    async setVotedById(ctx, id) {
        const voterAsBytes = await ctx.stub.getState(id);
        const voter = JSON.parse(voterAsBytes.toString());
        voter.voted = "true";
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(voter)));
    }

    async readVoterByEmail(ctx, email) {
        let queryString = {};
		queryString.selector = {};
		queryString.selector.docType = 'voter';
		queryString.selector.email = email;
        // queryString.selector.voted = 
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString));     
    }

    // vote
    async readVote(ctx, id) {
        const voteAsBytes = await ctx.stub.getState(id);
        if (!voteAsBytes || voteAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        return voteAsBytes.toString('utf8');
    }

    async readVotesByOwner(ctx, ownerId) {
        let queryString = {};
		queryString.selector = {};
		queryString.selector.docType = 'vote';
		queryString.selector.ownerId = ownerId;
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
    }



    async createVote(ctx, id, ownerId, positionId) {
        console.info('============= START : Create ballot ===========');
        const vote = {
            docType: 'vote',
            id: 'VOTES' + id,
            positionId: positionId,
            ownerId: ownerId,
        };
        await ctx.stub.putState(vote.id, Buffer.from(JSON.stringify(vote)));
        console.info('============= END : Create vote ===========');
    }

    async readAllVotes(ctx) {
        const startKey = 'VOTES';
        const endKey = 'VOTESz';
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
            allResults.push(record);
        }
        return JSON.stringify(allResults);
    }

    async readVoteBySelector(ctx, positionId, ownerId, voted=False) {
        let queryString = {};
		queryString.selector = {};
		queryString.selector.docType = 'vote';
		queryString.selector.positionId = positionId;
        queryString.selector.ownerId = ownerId;
        // queryString.selector.voted = 
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
    }

    // async changeVoteOwnerId(ctx, id, newOwnerId) {
    //     const voteAsBytes = await ctx.stub.getState(id); // get the vote from chaincode state
    //     if (!voteAsBytes || voteAsBytes.length === 0) {
    //         throw new Error(`${id} does not exist`);
    //     }
    //     const vote = JSON.parse(voteAsBytes.toString());
    //     vote.ownerId = newOwnerId;
    //     await ctx.stub.putState(id, Buffer.from(JSON.stringify(vote)));
    //     console.info('============= START : changeVoteOwnerId ===========');
    // }

    // async votingAction(ctx, ownerId, votedCandidates) {
    //     ballots = await this.readVotesByOwner(ctx, ownerId);
    //     if (!ballots && ballot.length === 0) {
    //         throw new Error(`You had voted !`)
    //     }
    //     results = JSON.parse(ballots);
    //     console.log(results[i]);
    // }
    // ballot
    // async readAllBalots(ctx) {

    // }

    // admin

    async readAdmin(ctx, id) {
        const adminAsBytes = await ctx.stub.getState(id);
        if (!adminAsBytes || adminAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        return adminAsBytes.toString(); 
    }

    async readAdminByEmail(ctx, email) {
        let queryString = {};
		queryString.selector = {};
		queryString.selector.docType = 'admin';
		queryString.selector.email = email;
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
    }

    async readAllAdmins(ctx) {
        const startKey = 'ADMIN';
        const endKey = 'ADMINz';
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
            allResults.push(record);
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
    async readAsset(ctx, id) {
        const assetAsBytes = await ctx.stub.getState(id);
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        return assetAsBytes.toString();
    }

    async readAllAssets(ctx) {
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
            allResults.push(record);
        }
        return JSON.stringify(allResults);
    }

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

    async QueryAssetsByQueryString(ctx, queryString) {
		return await this.GetQueryResultForQueryString(ctx, queryString);
	}

    async GetAssetHistory(ctx, assetName) {

		let resultsIterator = await ctx.stub.getHistoryForKey(assetName);
		let results = await this._GetAllResults(resultsIterator, true);

		return JSON.stringify(results);
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
                    allResults.push(jsonRes.Value);
				} else {
					jsonRes.Key = res.value.key;
					try {
						jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Record = res.value.value.toString('utf8');
					}
                    allResults.push(jsonRes.Record);
				}
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
