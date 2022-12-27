const { Contract } = require("../services/contract");
const ContractService = new Contract();
ContractService.init();

module.exports.get = async function(req, res) {
  try {
    let result = await ContractService.query_transaction(req.user.docType, 'readAllElections');
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
    const results = await ContractService.query_transaction(req.user.docType, 'readAllElections');
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
    const { id, name, start_date, duration} = req.body;
    await ContractService.logic_transaction(req.user.docType, 'editElection', id, name, start_date, duration);
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
    await ContractService.logic_transaction(req.user.docType, 'resetElection');
    res.status(200).json({response: 'success'});
  } catch(error) {
    res.json({
      error: error
    })
  }
}