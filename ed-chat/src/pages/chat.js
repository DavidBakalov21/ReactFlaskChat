import React from "react";
import "../styles/Chat.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Message from "../components/message";
import axios from "axios";
import io from "socket.io-client";
function Chat() {
  async function saveMessages(room, message, id) {
    await axios.post("http://localhost:5000/saveMessage", {
      room: room,
      message: message,
      sender: sessionStorage.getItem("user"),
      id: id,
    });
  }
  const SOCKET_IO_URL = "http://localhost:5000";
  let { email } = useParams();
  const [list, SetList] = useState([]);
  const [message, setMessage] = useState("");
  const [socketIO, setSocketIO] = useState(null);
  function generateRoomName(user1, user2) {
    let cleanedUser1 = user1.replace(/[@.]/g, "1");
    let cleanedUser2 = user2.replace(/[@.]/g, "1");
    return [cleanedUser1, cleanedUser2].sort().join("");
  }
  const [roomID, setRoomId] = useState("");
  useEffect(() => {
    const socket = io(SOCKET_IO_URL);
    setSocketIO(socket);
    const roomId = generateRoomName(sessionStorage.getItem("user"), email);
    setRoomId(roomId);
    axios
      .post("http://localhost:5000/loadMessage", {
        room: roomId,
      })
      .then((response) => {
        console.log(response);
        SetList(response.data);
      })
      .catch((error) => SetList([]));
    socket.on("connect", () => {
      console.log("Connected to Flask-SocketIO server");
      socket.emit("join", { room: roomId });
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("message", (msg) => {
      console.log("Received message:", msg);
      SetList((list) => [...list, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function Send() {
    const id =
      sessionStorage.getItem("user") +
      new Date().toISOString() +
      message +
      email;
    const messageData = {
      message: message,
      id: id,
      room: roomID,
      sender: sessionStorage.getItem("user"),
    };
    console.log(messageData);
    if (socketIO) {
      socketIO.send(messageData);
      saveMessages(roomID, message, id);
    }
    setMessage("");
  }

  return (
    <div>
      <h2 id="friend"></h2>
      <p id="name"></p>
      <div id="chat-container">
        <div id="chat-messages">
          {list.map((i) => (
            <Message key={i.id} message={i.message} sender={i.sender} />
          ))}
        </div>
        <input
          type="text"
          value={message}
          id="message-input"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button id="send-button" onClick={Send}>
          Send
        </button>
      </div>
    </div>
  );
}
export default Chat;
