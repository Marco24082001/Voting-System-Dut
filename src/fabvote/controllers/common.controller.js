const { gateway } = require('../services/gateway')
// import { v4 as uuidv4 } from 'uuid'; 

module.exports.get = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const id = req.params.id;
    let result = await contract.evaluateTransaction('GetAssetHistory', id);
    result = JSON.parse(result)
    res.json({
      response: result
    })
  } catch (error) {
    res.json({
      error: error
    })
  }
}
