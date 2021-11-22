const express = require("express");
const app = express();
var router = express.Router();
var chatController = require("../controller/chat.controller");

router.post("/getRoom", chatController.getRomChat);
router.post("/getMessageFromRoom", chatController.getMessageFromRoom);
router.post("/putMessage", chatController.putMessage);
router.post("/getRoomChat", chatController.getRoomChat);
router.post("/getMemberInRoom", chatController.getMemberInRoom);
router.post("/createNewRoomChat", chatController.createNewRoomChat);

module.exports = router;
