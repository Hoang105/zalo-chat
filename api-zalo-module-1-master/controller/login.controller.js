const AWS = require("../share/connect");

const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });
const code = "abc@123";
module.exports.login = (req, res) => {
  const { id, password } = req.body;
  console.log(req.body);
  var params = {
    TableName: "user-zalo",
    Key: {
      userid: id,
    },
  };
  docClient.get(params, function (err, data) {
    if (err) {
      res.status(200).json({ err: err });
    } else {
      if (!isEmpty(data)) {
        var crypto = require("crypto-js");
        var hash = crypto.AES.decrypt(data.Item.password, code);
        var hashPassword = hash.toString(crypto.enc.Utf8);
        if (hashPassword === password + code) res.json(data);
        else res.status(200).json({ err: "Sai tài khoản hoặc mật khẩu" });
      } else {
        res.status(200).json({ err: "Sai tài khoản hoặc mật khẩu" });
      }
    }
  });
};
const isEmpty = (v) => {
  return Object.keys(v).length === 0;
};
