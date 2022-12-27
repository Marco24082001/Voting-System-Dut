const { Contract } = require("../services/contract");
const ContractService = new Contract();
ContractService.init();


module.exports.get = async function(req, res) {
  try {
    const id = req.params.id;
    let result = await ContractService.query_transaction(req.user.docType, 'GetAssetHistory', id);
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
