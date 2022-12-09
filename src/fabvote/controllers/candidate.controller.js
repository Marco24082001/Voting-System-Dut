const { gateway } = require('../services/gateway')
const { v4:uuidv4 } = require('uuid');

module.exports.createCandidate = async function(req, res) {
  try {
    const id = uuidv4();
    const { name, biography, positionId, imageUrl} = req.body;
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    await contract.submitTransaction('createCandidate', id, name, positionId, biography, imageUrl);
    console.log('Transaction has been submitted');
    return res.send('Transaction has been submitted');
  } catch (error){
    return res.json({ error : error });
  }
}

module.exports.get = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const candidateId = req.params.id;
    result = JSON.parse(await contract.evaluateTransaction('readAsset', candidateId));
    return res.status(200).json({ response: result })
  } catch (error) {
    return res.json({ error : error });
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const network = await gateway.getNetwork('fabvotechannel');
    const contract = network.getContract('fabvote');
    const results = JSON.parse(await contract.evaluateTransaction('readAllCandidates'));
    for (const candidate of results) {
      const position = JSON.parse(await contract.evaluateTransaction('readAsset', candidate.positionId));
      candidate.position = position;
    }
    return res.status(200).json({ response: results });
  } catch (error) {
    return res.json({ error : error });
  }
}

module.exports.edit = async function(req, res) {
  try {
    const network = await gateway.getNetwork("fabvotechannel");
    const contract = network.getContract("fabvote");
    const { id, name, positionId, biography, imageUrl} = req.body;
    await contract.submitTransaction("editCandidate", id, name, positionId, biography, imageUrl);
    return res.status(200).json({response: "success"})
  } catch (error) {
    console.log(error);
    return res.json({ error : error });
  }
}

module.exports.delete = async function(req, res) {
  try {
    const network = await gateway.getNetwork("fabvotechannel");
    const contract = network.getContract("fabvote");
    const id = req.params.id;
    await contract.submitTransaction("deleteAsset", id);
    return res.status(200).json({ response: "success" });
  } catch (error) {
    return res.json({ error: error });
  }
}

module.exports.upload = async function(req, res) {
  return res.status(200).json({ response: "success" });
}