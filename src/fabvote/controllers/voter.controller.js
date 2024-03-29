const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const mailer = require("../utils/mailer");
const { Contract } = require("../services/contract");
const ContractService = new Contract();
ContractService.init();
require("dotenv").config()

module.exports.createVoter = async function (req, res) {
  try {
    const voterId = uuidv4();
    const { name, email } = req.body;
    const password = "voterpw";
    await ContractService.logic_transaction(req.user.docType, "createVoter", voterId, name, email, password);
    bcrypt.hash(email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
      const html_content = `
        <p>Set your password</p>
        <h2>click in this <a href="${process.env.APP_FRONTEND_URL}/verify?email=${email}&token=${hashedEmail}">link</a> to set password</h2>
      `
      mailer.sendMail(email, "Bạn đã có quyền bầu cử, làm theo các bước sau để bầu cử", html_content);
    })
    res.send("Transaction has been submitted");
  } catch (error) {
    console.log(error);
    return res.json({ error: error })
  }
}

module.exports.get = async function (req, res) {
  try {
    const voterId = req.params.id;
    let result = await ContractService.query_transaction(req.user.docType, "readVoter", voterId);
    result = JSON.parse(result)
    res.json({
      result: result
    })
  } catch (error) {
    console.log(err);
    return res.json({ error: error });
  }
}

module.exports.getAll = async function (req, res) {
  try {
    const results = await ContractService.query_transaction(req.user.docType, "readAllVoters");
    res.status(200).json({ response: JSON.parse(results) });
  } catch (error) {
    return res.json({ error: error })
  }
}

module.exports.edit = async function (req, res) {
  try {
    const { id, name, email, password, voted, verified } = req.body;
    await ContractService.logic_transaction(req.user.docType, "editVoter", id, name, email, password, voted, verified);
    console.log("Transaction has been submitted");
    res.status(200).json({ response: "success" })
  } catch (error) {
    console.log(error);
    return res.json({ error: error })
  }
}

module.exports.delete = async function (req, res) {
  try {
    const id = req.params.id;
    await ContractService.logic_transaction(req.user.docType, "deleteAsset", id);
    return res.status(200).json({ response: "success" });
  } catch (error) {
    return res.json({ error: error });
  }
}

module.exports.verify = async function (req, res) {
  try {
    const isValid = await compareEmail(req.query.email, req.query.token);
    if (isValid) {
      voter = JSON.parse( await ContractService.query_transaction("guest", "readVoterByEmail", req.query.email))[0];
      await ContractService.logic_transaction("guest", "editVoter", voter.id, voter.name, voter.email, req.query.password, voter.voted, true)
      return res.json({ response: 'success' })
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
}


const compareEmail = async (email, token) => {
  try {
    return await bcrypt.compare(email, token);
  } catch (error) {
    console.log(error);
  }
  
  return false
}