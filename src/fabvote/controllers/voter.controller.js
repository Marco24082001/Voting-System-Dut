const { gateway } = require('../services/gateway')
const { v4:uuidv4 } = require('uuid');

module.exports.createVoter = async function(req, res) {
  try {
    const voterId = uuidv4();
    const { name, email } = req.body;
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const password = 'voterpw';
    await contract.submitTransaction('createVoter', voterId, name, email, password);
    let positions = await contract.evaluateTransaction('readAllPositions');
    positions = JSON.parse(positions);
    positions.forEach(async (element) => {
        for (let i = 0; i < element.maximum; i++) {
            let voteId = uuidv4();
            await contract.submitTransaction('createVote', id=voteId, ownerId=voteId, positionId=element.id);
        }
    })
    console.log('Transaction has been submitted');
    res.send('Transaction has been submitted');
  } catch (err){
    console.log(err);
  }
}

module.exports.get = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const voterId = req.params.id;
    let result = await contract.evaluateTransaction('readVoter', voterId);
    result = JSON.parse(result)
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
    const results = await contract.evaluateTransaction('readAllVoters');
    res.status(200).json({response: JSON.parse(results)});
  } catch(err) {
    res.json({
      err: err
    })
  }
}

module.exports.edit = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const { id, name, email, password, hasVoted} = req.body;
    await contract.submitTransaction('editVoter', id, name, email, password, hasVoted);
    console.log('Transaction has been submitted');
    res.status(200).json({response: 'success'})
  } catch(e) {
    res.json({
      err: err
    })
  }
}


