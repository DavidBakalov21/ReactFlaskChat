import "../styles/Message.css";

function Message({ message }) {
  return (
    <div className="messageBlock">
      {message}
    </div>
  );
}
export default Message;
