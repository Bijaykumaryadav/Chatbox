class ChatEngine {
  constructor(chatBoxId, userName) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userName = userName;
    this.socket = io.connect("http://127.0.0.1:5000");

    if (this.userName) {
      this.connectionHandler();
    }
  }

  appendFunction = (message, data) => {
    let position = data.user_name === this.userName ? "right" : "left";
    let messageContainer = $('<div class="message">').addClass(position);

    // Create a span element for the message content
    let messageContentElement = $('<span class="message-content">');
    messageContentElement.text(message);

    // Append the message content to the message container
    messageContainer.append(messageContentElement);

    // Append the message container to the chat box
    this.chatBox.append(messageContainer);

    // Play sound for received messages
    if (position === "left") {
      let audioElement = new Audio("../audio/ting.mp3");
      audioElement.play();
    }
  };

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("Connection established using socket.io");

      self.socket.emit("new-user-joined", {
        user_name: self.userName,
        chatRoom: "chatBox",
      });
    });

    self.socket.on("user_joined", function (data) {
      self.appendFunction(`${data.user_name} joined the chat`, data);
    });

    $("#send-container").submit(function (event) {
      event.preventDefault();
      let msg = $("#messageInp").val();
      if (msg !== "") {
        self.socket.emit("send_message", {
          message: msg,
          user_name: self.userName,
          chatRoom: "chatBox",
        });
      }
      $("#messageInp").val("");
    });

    self.socket.on("receive_message", function (data) {
      self.appendFunction(data.message, data);
    });

    self.socket.on("leave", function (data) {
      self.appendFunction(`${data.user_name} left the chat`, data);
    });

    self.socket.on("disconnect", function () {
      self.appendFunction(`${self.userName} left the chat`);
    });
  }
}
