module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer);

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected!");
    });

    socket.on("new-user-joined", function (data) {
      console.log("joining request received", data);
      socket.join(data.chatRoom);
      io.in(data.chatRoom).emit("user_joined", data);
    });

    socket.on("send_message", function (data) {
      io.in(data.chatRoom).emit("receive_message", data);
    });

    socket.on("leave", function (data) {
      socket.leave(data.chatRoom);
      io.in(data.chatRoom).emit("leave", data);
    });
  });
};
