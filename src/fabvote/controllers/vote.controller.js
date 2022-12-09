const { gateway } = require('../services/gateway')
const { v4:uuidv4 } = require('uuid');


module.exports.getVotesHasVoted = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    // const voteId = req.params.id;
    // console.log(req.query.id);
    
    let result = await contract.evaluateTransaction('readVote', voteId);
    result = JSON.parse(result)
    // console.log(result.maximum);
    res.json({
      result: result
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const results = JSON.parse(await contract.evaluateTransaction('readAllVotes'));
    for (const vote of results) {
      const position = JSON.parse(await contract.evaluateTransaction('readAsset', vote.positionId));
      const candidate = JSON.parse(await contract.evaluateTransaction('readAsset', vote.ownerId));
      vote.position = position;
      vote.candidate = candidate;
    }
    return res.status(200).json({ response: results });
  } catch (error) {
    return res.json({ error : error })
  }
}

// module.exports.getbyOwner = async function(req, res) {
//     try {
//         const network = await gateway.getNetwork('fabvotechannel');
//         const contract = network.getContract('fabvote');
//         const ownerId = req.params.ownerId;
//         console.log(ownerId);
//         let results = await contract.evaluateTransaction('readVotesByOwner', ownerId);
//         // let results = await contract.evaluateTransaction('readAllPositions');
//         results = JSON.parse(results)
//         res.json({
//             result: results
//         })
//     } catch (err) {
//         console.log(err);
//     }
// }

// module.exports.getAll = async function(req, res) {
//   try {
//     const network = await gateway.getNetwork('fabvotechannel');
//     const contract = network.getContract('fabvote');
//     const results = await contract.evaluateTransaction('readAllVotes');
//     console.log(JSON.parse(results));
//     // console.log(`Transaction has been evaluated, result is: ${results.toString()}`);
//     res.status(200).json({response: JSON.parse(results)});
//   } catch(err) {
//     res.json({
//       err: err
//     })
//   }
// }


// module.exports.vote = async function(req, res) {
//   const network = await gateway.getNetwork('fabvotechannel');
//   const contract = network.getContract('fabvote');
//   const { voterId, vote_content } = req.body;
//   console.log(voterId);
//   console.log(vote_content);
//   vote_content.forEach(async element => {
    
//   });

//   // await contract.submitTransaction()
// }

// module.exports.getAll = async function(req, res) {
//     try {
//       const network = await gateway.getNetwork('fabvotechannel');
//       const contract = network.getContract('fabvote');
//       const results = await contract.evaluateTransaction('readAllPositions');
//       console.log(JSON.parse(results));
//       // console.log(`Transaction has been evaluated, result is: ${results.toString()}`);
//       res.status(200).json({response: JSON.parse(results)});
//     } catch(err) {
//       res.json({
//         err: err
//       })
//     }
//   }



// module.exports.edit = async function(req, res) {
//   try {
//     const network = await gateway.getNetwork('fabvotechannel');
//     const contract = network.getContract('fabvote');
//     const { id, name, maximum} = req.body;
//     await contract.submitTransaction('editPosition', id, name, maximum);
//     console.log('Transaction has been submitted');
//     res.status(200).json({response: 'success'})
//   } catch(e) {
//     res.json({
//       err: err
//     })
//   }
// }
