import { useSelector } from "react-redux";
import { Conversation } from "./index";
import { getConversationId } from "../../../utils/chat";

const Conversations = ({ onlineUsers, typing }) => {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations?.length > 0 &&
          conversations
            ?.filter(
              (conversation) =>
                conversation?.latestMessage ||
                conversation?._id === activeConversation?._id
            )
            ?.map((conversation) => {
              let check = onlineUsers?.find(
                (onlineUser) =>
                  onlineUser?.userId ===
                  getConversationId(user, conversation?.users)
              );
              return (
                <Conversation
                  conversation={conversation}
                  key={conversation?._id}
                  online={!!check}
                  typing={typing}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversations;
