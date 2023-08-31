import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { getConversationMessages } from "../../features/ChatSlice";
import ChatActions from "./actions/ChatActions";
import { checkOnlineStatus, getConversationId } from "../../utils/chat";

const ChatPanel = ({ onlineUsers, typing }) => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const values = {
    token: user?.token,
    conversationId: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      {/* Container */}
      <div>
        {/* Chat header */}
        <ChatHeader
          online={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation?.users
          )}
        />
        {/* Chat messages */}
        <ChatMessages typing={typing} />
        {/* Chat actions */}
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatPanel;
