const { gateway } = require("../services/gateway")
const { v4:uuidv4 } = require("uuid");

module.exports.createPosition = async function(req, res) {
  try {
    const id = uuidv4();
    const { name, maximum} = req.body;
    console.log(maximum);
    // start_time = (new Date()).toLocaleString();
    // end_time = (new Date(new Date().getDate() + 1)).toLocaleString()
    const network = await gateway.getNetwork("fabvotechannel");
    const contract = network.getContract("fabvote");
    await contract.submitTransaction("createPosition", id, name, maximum);
    console.log("Transaction has been submitted");
    return res.send("Transaction has been submitted");
  } catch (error){
    console.log(error)
    return res.json({ error : error });
  }
}

module.exports.get = async function(req, res) {
  try {
    const network = await gateway.getNetwork("fabvotechannel");
    const contract = network.getContract("fabvote");
    const positionId = req.params.id;
    let result = await contract.evaluateTransaction("readAsset", positionId);
    result = JSON.parse(result)
    return res.status(200).json({ response: result })
  } catch (error) {
    return res.json({ error : error });
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const network = await gateway.getNetwork("fabvotechannel");
    const contract = network.getContract("fabvote");
    const results = await contract.evaluateTransaction("readAllPositions");
    return res.status(200).json({response: JSON.parse(results)});
  } catch (error) {
    return res.json({ error : error });
  }
}

module.exports.edit = async function(req, res) {
  try {
    const network = await gateway.getNetwork("fabvotechannel");
    const contract = network.getContract("fabvote");
    const { id, name, maximum} = req.body;
    await contract.submitTransaction("editPosition", id, name, maximum);
    console.log("Transaction has been submitted");
    return res.status(200).json({response: "success"})
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
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
