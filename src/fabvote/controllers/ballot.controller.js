const { Contract } = require("../services/contract");
const ContractService = new Contract();
ContractService.init();
const { v4: uuidv4 } = require('uuid');

module.exports.getAllBallots = async function (req, res) {
  try {
    let ballots = [];
    const positions = JSON.parse(await ContractService.query_transaction(req.user.docType, 'readAllPositions'));
    for (const position of positions) {
      let ballot = {};
      const queryString = {
        selector: {
          docType: 'candidate',
          positionId: position.id
        }
      };
      const candidates = JSON.parse(await ContractService.query_transaction(req.user.docType, 'QueryAssetsByQueryString', JSON.stringify(queryString)));
      ballot.position = position;
      ballot.candidates = candidates;
      ballots.push(ballot);
    }
    console.log('Transaction has been submitted');
    return res.status(200).json({ response: ballots });
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
}

module.exports.submitBallots = async function (req, res) {
  try {
    const user = JSON.parse(await ContractService.query_transaction(req.user.docType, 'readAsset', req.user.id));
    if (user.voted === "false") {
      const ballots = req.body;
      for (const ballot of ballots) {
        for (const voted_candidate of ballot.voted_candidates) {
          const id = uuidv4();
          await ContractService.logic_transaction(req.user.docType, 'createVote', id, voted_candidate, ballot.position.id);
        }
      }
      await ContractService.logic_transaction(req.user.docType, 'setVotedById', user.id);
      return res.json({ response: 'success' })
    } else {
      return res.json({ error: "You had voted!" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
}
