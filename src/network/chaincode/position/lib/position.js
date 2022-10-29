/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class PositionCC extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const positions = [
            {
                name: 'ĐB HĐND TP đà nẵng',
                owner: 'Thanh Vi',
                maximum: 3
            }
        ];

        for (let i = 0; i < positions.length; i++) {
            positions[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(positions[i])));
            console.info('Added <--> ', positions[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryPosition(ctx, id) {
        const positionAsBytes = await ctx.stub.getState(id); // get the car from chaincode state
        if (!positionAsBytes || positionAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(positionAsBytes.toString());
        return positionAsBytes.toString();
    }

    async createPosition(ctx, id, name, owner, maximum) {
        console.info('============= START : Create Position ===========');

        const position = {
            docType: 'position',
            name,
            owner,
            maximum
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(position)));
        console.info('============= END : Create Position ===========');
    }

    async queryAllPosition(ctx) {
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

}

module.exports = PositionCC;
