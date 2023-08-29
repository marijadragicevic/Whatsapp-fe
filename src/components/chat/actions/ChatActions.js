import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { SendIcon } from "../../../svg";
import { sendMessage } from "../../../features/ChatSlice";
import Attachments from "./Attachments";
import Input from "./Input";
import EmojiPickerPanel from "./EmojiPickerPanel";

const ChatActions = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const textRef = useRef();

  const { user } = useSelector((state) => state.user);
  const { activeConversation, status } = useSelector((state) => state.chat);

  const values = {
    message,
    token: user.token,
    conversationId: activeConversation?._id,
    files: [],
  };

  const changeMessageHandler = (newMessage) => {
    setMessage(newMessage);
  };

  const sendMessageHandler = (event) => {
    event.preventDefault();

    const isMessageEmpty = !message?.trim();

    if (!isMessageEmpty) {
      dispatch(sendMessage(values));
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={sendMessageHandler}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/* Container */}
      <div className="w-full flex items-center gap-x-2">
        {/* Emojis and attachments*/}
        <ul className="flex gap-x-2">
          <EmojiPickerPanel
            textRef={textRef}
            message={message}
            setMessage={changeMessageHandler}
          />
          <Attachments />
        </ul>
        {/* Input */}
        <Input
          textRef={textRef}
          message={message}
          setMessage={changeMessageHandler}
        />
        {/* Send button */}
        <button className="btn" type="submit">
          {status === "loading" ? (
            <ClipLoader color="#e9edef" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
