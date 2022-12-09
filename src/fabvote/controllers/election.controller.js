const { gateway } = require('../services/gateway')
// import { v4 as uuidv4 } from 'uuid'; 

module.exports.get = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const electionId = req.params.id;
    // console.log(req.query.id);
    let result = await contract.evaluateTransaction('readElection', electionId);
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
    const results = await contract.evaluateTransaction('readAllElections');
    // console.log(`Transaction has been evaluated, result is: ${results.toString()}`);
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
    const { id, name, start_time, end_time} = req.body;
    await contract.submitTransaction('editElection', id, name, start_time, end_time);
    console.log('Transaction has been submitted');
    res.status(200).json({response: 'success'})
  } catch(e) {
    res.json({
      err: err
    })
  }
}
