import "../styles/Message.css";
import { useEffect, useState } from "react";
function Message({ message, sender }) {
  const [className, setClassName] = useState("");
useEffect(() =>{
  if(sender === sessionStorage.getItem("user")){
    setClassName("messageBlockRight");
  }else{
    setClassName("messageBlockLeft");
  }
},[])
  return (
    
    <div className={className}>
      {sender}
      <p>{message}</p>
    </div>
  );
}
export default Message;
