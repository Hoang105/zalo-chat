const AWS = require("../share/connect");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });
const io = require("../share/socket");

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
  const { roomid } = req.body;
  var params = {
    TableName: "chat",
    KeyConditionExpression: "#pk = :roomid",
    ScanIndexForward: false,
    Limit: 100,
    ExpressionAttributeNames: {
      "#pk": "PK",
    },
    ExpressionAttributeValues: {
      ":roomid": roomid,
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

//PK roomId
module.exports.putMessage = (req, res) => {
  const { PK, SK, owner, time, member, message, image } = req.body;
  const params = {
    TableName: "chat",
    ReturnValues: "ALL_OLD",
    Item: {
      PK: PK,
      SK: SK,
      owner: owner,
      time: time,
      roomMember: member,
      message: message,
      image: image,
    },
  };
  docClient.put(params, function (err, data) {
    if (err) res.send(err);
    else {
      var params = {
        TableName: "chat",
        KeyConditionExpression: "#pk = :PK",
        ScanIndexForward: false,
        Limit: 100,
        ExpressionAttributeNames: {
          "#pk": "PK",
        },
        ExpressionAttributeValues: {
          ":PK": PK,
        },
      };
      docClient.query(params, function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json(data.Items);
        }
      });
    }
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
  const { userId } = req.body;
  var params = {
    TableName: "room-chat",
    FilterExpression: "contains(roomMember, :userId )",
    ScanIndexForward: false,
    Limit: 500,
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  docClient.scan(params, function (err, data) {
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
    userId,
    roomName,
    roomImage,
    roomNotify,
    roomConversations,
    roomMember,
    leaderId,
    deputyTeamId,
    isGroup,
  } = req.body;
  let FilterExpression = "";
  let ExpressionAttributeValues = {};
  for (let i = 0; i < roomMember.length; i++) {
    if (i === roomMember.length - 1) {
      FilterExpression += `contains(roomMember, :${roomMember[i]})`;
      // ExpressionAttributeValues += `":${roomMember[i]}": ${roomMember[i]}`;
    } else {
      FilterExpression += `contains(roomMember, :${roomMember[i]} ) and `;
    }
    ExpressionAttributeValues[`:${roomMember[i]}`] = roomMember[i];
  }

  var params = {
    TableName: "room-chat",
    FilterExpression: `${FilterExpression}`,
    ScanIndexForward: false,
    Limit: 500,
    ExpressionAttributeValues: ExpressionAttributeValues,
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      if (data.Items.length === 0) {
        var uuid = require("uuid");
        const pk = uuid.v1();
        const sk = uuid.v4();
        var params2 = {
          TableName: "room-chat",
          Item: {
            PK: pk,
            SK: sk,
            roomId: pk,
            userId: userId,
            roomImage: roomImage,
            roomNotify: roomNotify,
            roomConversations: roomConversations,
            roomName: roomName,
            leadId: leaderId,
            deputyTeamId: deputyTeamId,
            roomMember: docClient.createSet(roomMember),
          },
        };
        docClient.put(params2, function (err, data) {
          if (err) {
            res.status(200).send(err);
          } else {
            res.json({
              PK: pk,
              SK: sk,
              roomId: pk,
              userId: userId,
              roomImage: roomImage,
              roomNotify: roomNotify,
              roomConversations: roomConversations,
              roomName: roomName,
              leadId: leaderId,
              deputyTeamId: deputyTeamId,
              roomMember: roomMember,
            });
          }
        });
      } else {
        res.json(data.Items[0]);
      }
    }
  });
};
