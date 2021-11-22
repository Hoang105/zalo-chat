const AWS = require("../share/connect");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });

module.exports.getRomChat = async (req, res) => {
  const { id } = req.body;

  try {
    const ls = await getValueByPkSk(id, "room");
    if (ls.Count > 0) {
      const params = {
        TableName: "user-zalo",
        ScanIndexForward: true,
        AttributesToGet: ["userid", "username", "imgurl"],
        ScanFilter: {
          userid: {
            ComparisonOperator: "IN",
            AttributeValueList: ls.list,
          },
        },
      };
      docClient.scan(params, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          let resutl = [];
          data.Items.forEach((user) => {
            resutl[ls.list.indexOf(user.userid)] = user;
          });
          ls.Items.forEach((room) => {
            let index = ls.list.indexOf(room.member);
            resutl[index].infoRoom = room;
            resutl[index].index = index;
          });
          res.json({ Items: resutl });
        }
      });
    } else res.json({ Items: [] });
  } catch (error) {
    res.send(error);
  }
};
module.exports.getMessageFromRoom = (req, res) => {
  const { roomid, type } = req.body;
  console.log(roomid);
  console.log(type);
  var params = {
    TableName: "chat",
    KeyConditionExpression: "#pk = :romid and begins_with( #sk,:chat)",
    ScanIndexForward: false,
    Limit: 100,
    ExpressionAttributeNames: {
      "#pk": "PK",
      "#sk": "SK",
    },
    ExpressionAttributeValues: {
      ":romid": roomid,
      ":chat": type,
    },
  };
  docClient.query(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      console.log(data.Items);
      res.json(data);
    }
  });
};

module.exports.putMessage = (req, res) => {
  const { PK, SK, owner, time, member, message } = req.body;
  const params = {
    TableName: "chat",
    ReturnValues: "ALL_OLD",
    Item: {
      PK: PK,
      SK: SK,
      owner: owner,
      time: time,
      member: member,
      message: message,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) res.send(err);
    else res.json({ message: "Đã nhận" });
  });
};

function getValueByPkSk(pk, sk) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "chat",
      KeyConditionExpression: "#pk = :id and begins_with( #sk,:chat)",
      ScanIndexForward: false,
      ExpressionAttributeNames: {
        "#pk": "PK",
        "#sk": "SK",
      },
      ExpressionAttributeValues: {
        ":id": pk,
        ":chat": sk,
      },
    };
    docClient.query(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let arr = [];
        data.Items.forEach((element) => {
          arr.push(element.member);
        });
        data.list = arr;
        resolve(data);
      }
    });
  });
}

module.exports.getRoomChat = (req, res) => {
  const { userid } = req.body;
  var params = {
    TableName: "room-chat",
    KeyConditionExpression: "#pk = :userid and begins_with( #sk,:room)",
    ScanIndexForward: false,
    Limit: 100,
    ExpressionAttributeNames: {
      "#pk": "PK",
      "#sk": "SK",
    },
    ExpressionAttributeValues: {
      ":userid": userid,
      ":room": "room",
    },
  };

  docClient.query(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      console.log(data.Items);
      res.json(data);
    }
  });
};

module.exports.getMemberInRoom = (req, res) => {
  const { member } = req.body;
  const arr = member.split(",");
  try {
    const params = {
      TableName: "user-zalo",
      AttributesToGet: ["userid", "username", "imgurl", "birthday", "gender"],
      ScanFilter: {
        userid: {
          ComparisonOperator: "IN",
          AttributeValueList: arr,
        },
      },
    };
    docClient.scan(params, function (err, data) {
      if (err) res.send({ err: err });
      else res.json(data);
    });
  } catch (error) {
    res.send(error);
  }
};

//create new room from user
module.exports.createNewRoomChat = (req, res) => {
  const {
    roomId,
    roomName,
    roomImage,
    roomNotify,
    roomConversations,
    roomMember,
  } = req.body;
  var params2 = {
    TableName: "room-chat",
    Item: {
      PK: roomId,
      SK: roomId,
      roomId: roomId,
      roomImage: roomImage,
      roomNotify: roomNotify,
      roomConversations: roomConversations,
      roomName: roomName,
      roomMember: roomMember,
    },
  };
  docClient.put(params2, function (err, data) {
    if (err) {
      res.status(200).send(err);
    } else {
      res.json({
        PK: roomId,
        SK: roomId,
        roomId: roomId,
        roomImage: roomImage,
        roomNotify: roomNotify,
        roomConversations: roomConversations,
        roomName: roomName,
        roomMember: roomMember,
      });
    }
  });
};
