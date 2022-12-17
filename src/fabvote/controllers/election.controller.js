const { gateway } = require('../services/gateway')
// import { v4 as uuidv4 } from 'uuid'; 

module.exports.get = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    let result = await contract.evaluateTransaction('readAllElections');
    result = JSON.parse(result)
    res.json({
      response: result[0]
    })
  } catch (error) {
    res.json({
      error: error
    })
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const results = await contract.evaluateTransaction('readAllElections');
    // console.log(`Transaction has been evaluated, result is: ${results.toString()}`);
    res.status(200).json({response: JSON.parse(results)[0]});
  } catch(error) {
    res.json({
      error: error
    })
  }
}

module.exports.edit = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const { id, name, start_date, duration} = req.body;
    await contract.submitTransaction('editElection', id, name, start_date, duration);
    console.log('Transaction has been submitted');
    res.status(200).json({response: 'success'})
  } catch(error) {
    res.json({
      error: error
    })
  }
}

module.exports.reset = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    await contract.submitTransaction('resetElection');
    res.status(200).json({response: 'success'});
  } catch(error) {
    res.json({
      error: error
    })
  }
}