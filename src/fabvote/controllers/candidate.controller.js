const { gateway } = require('../services/gateway')
const { v4:uuidv4 } = require('uuid');

module.exports.create = async function(req, res) {
  try {
    const id = uuidv4();
    const { name, biography, positionId} = req.body;
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    await contract.submitTransaction('createCandidate', id, name, positionId, biography);
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
    result = await contract.evaluateTransaction('readCandidate', req.params.id);
    console.log(req.params.id);
  } catch (err) {
    console.log(err);
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const results = await contract.evaluateTransaction('readAllCandidates');
    console.log(JSON.parse(results));
    // console.log(`Transaction has been evaluated, result is: ${results.toString()}`);
    res.status(200).json({response: JSON.parse(results)});
  } catch(err) {
    res.json({
      err: err
    })
  }
}


