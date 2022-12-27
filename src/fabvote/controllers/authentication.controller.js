const { sign } = require("jsonwebtoken");
const mailer = require("../utils/mailer");
const { Contract } = require("../services/contract");
const ContractService = new Contract();
ContractService.init();


require("dotenv").config()


module.exports.login = async function(req, res) {
  try {
    const { email, password} = req.body;
    const admin = JSON.parse(await ContractService.query_transaction("guest", "readAdminByEmail", email));
    if (admin.length == 0) {
        const voter = JSON.parse(await ContractService.query_transaction("guest", "readVoterByEmail", email));
        if (voter.length == 0) {
            return res.json({ error: "User doesn't exist" });
        }
        if (voter[0].password === password) {
            const accessToken = sign(
                voter[0],
                process.env.KEY_SIGN
            );
            return res.json(accessToken);
        } else {
            return res.json({ error: "Password wrong" });
        }
    }
    if (admin[0].password === password) {
        const accessToken = sign(
            admin[0],
            process.env.KEY_SIGN
        )
        return res.json(accessToken);
    } else {
        return res.json({ error: "Password wrong" });
    }
  } catch (err){
    console.log(err);
    return res.json({ error: "System catch error"});
  }
}

module.exports.getCurrentUser = async function(req, res) {
  try {
    const user = JSON.parse(await  ContractService.query_transaction(req.user.docType,"readAsset", req.user.id));
    return res.status(200).json({ response : user })
  } catch (error) {
    return res.json({ error : error });
  }
}
