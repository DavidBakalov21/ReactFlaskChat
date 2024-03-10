import "../styles/main.css";
import { Link, useNavigate } from "react-router-dom";
import ChatElement from "../components/chatElement";
import axios from "axios";
import { useState, useEffect } from "react";
function ChatList() {
  const navigate = useNavigate();
  const [list, SetList] = useState([]);
  useEffect(() => {
    const email1 = sessionStorage.getItem("user");
    console.log(email1);
    if (email1 !== null) {
      console.log(email1);
      axios
        .post("http://localhost:5000/test", {
          email: email1,
        })
        .then((response) => {
          console.log(response);
          SetList(response.data);
        })
        .catch((error) => SetList([]));
    } else {
      navigate("/signin");
    }
  }, []);
  return (
    <div className="container">
      {list.map((i) => (
        <ChatElement key={i._id} item={i} />
      ))}
    </div>
  );
}
export default ChatList;
