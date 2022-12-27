const { v4:uuidv4 } = require('uuid');
const { Contract } = require("../services/contract");
const ContractService = new Contract();
ContractService.init();

module.exports.createCandidate = async function(req, res) {
  try {
    const id = uuidv4();
    const { name, biography, positionId, imageUrl} = req.body;
    await ContractService.logic_transaction(req.user.docType, 'createCandidate', id, name, positionId, biography, imageUrl);
    console.log('Transaction has been submitted');
    return res.send('Transaction has been submitted');
  } catch (error){
    return res.json({ error : error });
  }
}

module.exports.get = async function(req, res) {
  try {
    const candidateId = req.params.id;
    result = JSON.parse(await ContractService.query_transaction(req.user.docType, 'readAsset', candidateId));
    return res.status(200).json({ response: result })
  } catch (error) {
    return res.json({ error : error });
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const results = JSON.parse(await ContractService.query_transaction(req.user.docType, 'readAllCandidates'));
    for (const candidate of results) {
      const position = JSON.parse(await ContractService.query_transaction(req.user.docType, 'readAsset', candidate.positionId));
      candidate.position = position;
    }
    return res.status(200).json({ response: results });
  } catch (error) {
    return res.json({ error : error });
  }
}

module.exports.edit = async function(req, res) {
  try {
    const { id, name, positionId, biography, imageUrl} = req.body;
    await ContractService.logic_transaction(req.user.docType, "editCandidate", id, name, positionId, biography, imageUrl);
    return res.status(200).json({response: "success"})
  } catch (error) {
    console.log(error);
    return res.json({ error : error });
  }
}

module.exports.delete = async function(req, res) {
  try {
    const id = req.params.id;
    await ContractService.logic_transaction(req.user.docType, "deleteAsset", id);
    return res.status(200).json({ response: "success" });
  } catch (error) {
    return res.json({ error: error });
  }
}

module.exports.upload = async function(req, res) {
  return res.status(200).json({ response: "success" });
}