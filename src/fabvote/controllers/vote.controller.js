const { Contract } = require("../services/contract");
const ContractService = new Contract();
ContractService.init();

module.exports.getVotesHasVoted = async function(req, res) {
  try {
    let result = await ContractService.query_transaction(req.user.docType, 'readVote', voteId);
    result = JSON.parse(result)
    res.json({
      result: result
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports.getAll = async function(req, res) {
  try {
    const results = JSON.parse(await ContractService.query_transaction(req.user.docType, 'readAllVotes'));
    for (const vote of results) {
      const position = JSON.parse(await ContractService.query_transaction(req.user.docType, 'readAsset', vote.positionId));
      const candidate = JSON.parse(await ContractService.query_transaction(req.user.docType, 'readAsset', vote.ownerId));
      vote.position = position;
      vote.candidate = candidate;
    }
    return res.status(200).json({ response: results });
  } catch (error) {
    return res.json({ error : error })
  }
}
