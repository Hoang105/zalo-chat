const cors = require("cors");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
require("dotenv").config();
const multer = require("multer");

const PORT = process.env.PORT;

const chatRoutes = require("./routes/chat.routes");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("connectnotify", (room) => {
    socket.join(room.id);
    console.log(socket.adapter.rooms);
  });

  socket.on("userconnect", (data) => {
    io.to(data.id).emit("notify", data.model);
  });

  socket.on("sendaccept", (data) => {
    io.to(data.id).emit("accept", data.model);
  });

  socket.on("deletefriend", (data) => {
    io.to(data.id).emit("delete", data);
  });

  socket.on("newmessage", (data) => {
    socket.join(data);
  });

  socket.on("joinroom", (data) => {
    socket.join(data.id);
  });

  socket.on("sendmessage", (data) => {
    io.to(data.id).emit("getmessage", data.data);
  });

  socket.on("sendNewGroup", (data) => {
    io.to(data.idReceiver).emit("getNewGroup", "reload");
  });
});
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

aws.config.update({
  region: "us-east-2",
  endpoint: "http://s3-us-east-2.amazonaws.com/",
  accessKeyId: "AKIA3WYGINIRKZVFJ2M7",
  secretAccessKey: "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",
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "lab3-phe",
    key: function (req, file, cb) {
      req.file = `Image` + Date.now() + file.originalname;
      cb(null, `Image` + Date.now() + file.originalname);
    },
  }),
});

module.exports = upload;
// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     callBack(null, "upload/image");
//     // callBack(null, "../zalo-master/zalo-master/src/assets/upload/image");
//   },
//   filename: (req, file, callBack) => {
//     callBack(null, `${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/file", upload.single("file"), (req, res, next) => {
//   const file = req.file;
//   if (!file) {
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file);
// });

// app.post("/multipleFiles", upload.array("files"), (req, res, next) => {
//   const files = req.files;
//   console.log(files);
//   if (!files) {
//     const error = new Error("No File");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send({ sttus: "ok" });
// });
// app.use(cors());

app.post("/file", upload.array("image", 1), (req, res) => {
  res.send({
    image: `https://s3-us-east-2.amazonaws.com/lab3-phe/` + req.file,
  });
});
app.use("/api", chatRoutes);

http.listen(PORT, () => {
  console.log(`Api listening at http://localhost:${PORT}`);
});
