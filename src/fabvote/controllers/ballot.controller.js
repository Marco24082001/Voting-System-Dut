const { gateway } = require('../services/gateway')
// import { v4 as uuidv4 } from 'uuid'; 
const { v4: uuidv4 } = require('uuid');

module.exports.getAllBallots = async function (req, res) {
  try {
    let ballots = [];
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const positions = JSON.parse(await contract.evaluateTransaction('readAllPositions'));
    for (const position of positions) {
      let ballot = {};
      const queryString = {
        selector: {
          docType: 'candidate',
          positionId: position.id
        }
      };
      const candidates = JSON.parse(await contract.evaluateTransaction('QueryAssetsByQueryString', JSON.stringify(queryString)));
      ballot.position = position;
      ballot.candidates = candidates;
      ballots.push(ballot);
    }
    console.log('Transaction has been submitted');
    return res.status(200).json({ response: ballots });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
}

module.exports.getBallotsForVoter = async function (req, res) {
  try {
    const voterId = req.params.id;
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    // check user has voted
    const voter = JSON.parse(await contract.evaluateTransaction('readAsset', voterId));
    console.log(voter);
  } catch (error) {
    console.log(error);
  }
}

module.exports.submitBallots = async function (req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const user = JSON.parse(await contract.evaluateTransaction('readAsset', req.user.id));
    if (user.voted === "false") {
      const ballots = req.body;
      console.log(ballots)
      for (const ballot of ballots) {
        for (const voted_candidate of ballot.voted_candidates) {
          const id = uuidv4();
          console.log(id, voted_candidate);
          await contract.submitTransaction('createVote', id, voted_candidate, ballot.position.id);
        }
      }
      await contract.submitTransaction('setVotedById', user.id);
      return res.json({ response: 'success' })
    } else {
      return res.json({ error: "You had voted!" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
}

// module.exports.get = async function(req, res) {
//   try {
//     const network = await gateway.getNetwork('fabvotechannel');
//     const contract = network.getContract('fabvote');
//     result = await contract.evaluateTransaction('readPosition', req.params.id);
//     console.log(req.params.id);
//   } catch (err) {
//     console.log(err);
//   }
// }

// module.exports.getAll = async function(req, res) {
//   try {
//     const network = await gateway.getNetwork('fabvotechannel');
//     const contract = network.getContract('fabvote');
//     const results = await contract.evaluateTransaction('readAllPositions');
//     console.log(JSON.parse(results));
//     // console.log(`Transaction has been evaluated, result is: ${results.toString()}`);
//     res.status(200).json({response: JSON.parse(results)});
//   } catch(err) {
//     res.json({
//       err: err
//     })
//   }
// }
