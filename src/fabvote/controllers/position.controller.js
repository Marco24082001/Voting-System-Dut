const { gateway } = require('../services/gateway')
// import { v4 as uuidv4 } from 'uuid'; 
const { v4:uuidv4 } = require('uuid');

module.exports.createPosition = async function(req, res) {
  try {
    const id = uuidv4();
    const { name, maximum} = req.body;
    start_time = (new Date()).toLocaleString();
    end_time = (new Date(new Date().getDate() + 1)).toLocaleString()
    console.log(name);
    console.log(maximum);
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    await contract.submitTransaction('createPosition', id, name, maximum, start_time, end_time);
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
    // console.log(req.query.id);
    let result = await contract.evaluateTransaction('readPosition', req.query.id);
    result = JSON.parse(result)
    console.log(result.maximum);
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
