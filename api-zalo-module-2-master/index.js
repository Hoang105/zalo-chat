const cors = require("cors");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT;

const chatRoutes = require("./routes/chat.routes");

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
  socket.on("sendmessage", (mess) => {
    console.log(mess.message);
    io.in(mess.message.PK).emit("getmessage", mess.message);
  });
});
app.use(cors());

app.use("/api", chatRoutes);

http.listen(PORT, () => {
  console.log(`Api listening at http://localhost:${PORT}`);
});

/* lỗi
  app.listen(PORT, () => {
  console.log(`Api listening at http://localhost:${PORT}`);
});
*/
