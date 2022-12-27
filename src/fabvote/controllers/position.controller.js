const { v4:uuidv4 } = require("uuid");
const { Contract } = require("../services/contract");
const ContractService = new Contract();
ContractService.init();

module.exports.createPosition = async function(req, res) {
  try {
    const id = uuidv4();
    await ContractService.logic_transaction(req.user.docType, "createPosition", id, name, maximum);
    console.log("Transaction has been submitted");
    return res.send("Transaction has been submitted");
  } catch (error){
    console.log(error)
    return res.json({ error : error });
  }
}

module.exports.get = async function(req, res) {
  try {
    const positionId = req.params.id;
    let result = await ContractService.query_transaction(req.user.docType, "readAsset", positionId);
    result = JSON.parse(result)
    return res.status(200).json({ response: result })
  } catch (error) {
    return res.json({ error : error });
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const results = await ContractService.query_transaction(req.user.docType, "readAllPositions");
    return res.status(200).json({response: JSON.parse(results)});
  } catch (error) {
    return res.json({ error : error });
  }
}

module.exports.edit = async function(req, res) {
  try {
    const { id, name, maximum} = req.body;
    await ContractService.logic_transaction(req.user.docType, "editPosition", id, name, maximum);
    console.log("Transaction has been submitted");
    return res.status(200).json({response: "success"})
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
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
