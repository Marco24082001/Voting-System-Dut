const { gateway } = require('../services/gateway')
// import { v4 as uuidv4 } from 'uuid'; 
const { v4:uuidv4 } = require('uuid');

module.exports.createBallotForVoter = async function(req, res) {
  try {
    const id = uuidv4();
    const { email } = req.body;
    
    console.log(name);
    console.log(maximum);
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    let position = await network.evaluateTransaction('readPosition', 'POSITIONd4366f56-170f-419e-a6d0-daf665d9f442')
    position = JSON.parse(position)
    console.log(position)
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
    result = await contract.evaluateTransaction('readPosition', req.params.id);
    console.log(req.params.id);
  } catch (err) {
    console.log(err);
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const results = await contract.evaluateTransaction('readAllPositions');
    console.log(JSON.parse(results));
    // console.log(`Transaction has been evaluated, result is: ${results.toString()}`);
    res.status(200).json({response: JSON.parse(results)});
  } catch(err) {
    res.json({
      err: err
    })
  }
}
