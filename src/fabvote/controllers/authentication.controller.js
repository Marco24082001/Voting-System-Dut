const { gateway } = require("../services/gateway")
const { sign } = require("jsonwebtoken");
const mailer = require("../utils/mailer");
require("dotenv").config()


module.exports.login = async function(req, res) {
  try {
    const network = await gateway.getNetwork("fabvotechannel");
    const contract = network.getContract("fabvote");
    const { email, password} = req.body;
    console.log(email, password);

    const admin = JSON.parse(await contract.evaluateTransaction("readAdminByEmail", email));
    if (admin.length == 0) {
        const voter = JSON.parse(await contract.evaluateTransaction("readVoterByEmail", email));
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
    const network = await gateway.getNetwork("fabvotechannel");
    const contract = network.getContract("fabvote");
    const user = JSON.parse(await  contract.evaluateTransaction("readAsset", req.user.id));
    return res.status(200).json({ response : user })
  } catch (error) {
    return res.json({ error : error });
  }
}
