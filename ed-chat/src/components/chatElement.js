import "../styles/chatElement.css";
import { Link } from "react-router-dom";
function ChatElement({ item }) {
  return (
    <div key={item.email} className="item">
      {item.first_name} {item.last_name}
      <Link to={`/chatUser/${item.email}`} className="chat-link">
        Chat
      </Link>
    </div>
  );
}
export default ChatElement;
