import { useEffect, useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { useSelector } from "react-redux";

const Input = ({ message, setMessage, textRef, socket }) => {
  const { activeConversation } = useSelector((state) => state.chat);
  const [typing, setTyping] = useState(false);
  const [lastTypingTime, setLastTypingTime] = useState(null);

  const timer = 1000;

  const onChangeMessageHandler = (event) => {
    setMessage(event.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation?._id);
    }
    setLastTypingTime(new Date().getTime());
  };

  useEffect(() => {
    let typingTimer = setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit("stop typing", activeConversation?._id);
        setTyping(false);
      }
    }, timer);

    return () => clearInterval(typingTimer);
  }, [lastTypingTime]);

  return (
    <div className="w-full ">
      <input
        ref={textRef}
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={(event) => onChangeMessageHandler(event)}
      />
    </div>
  );
};

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default InputWithSocket;
