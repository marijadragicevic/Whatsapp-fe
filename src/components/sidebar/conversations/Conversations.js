import { useSelector } from "react-redux";
import { Conversation } from "./index";

const Conversations = () => {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );

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
            ?.map((conversation) => (
              <Conversation
                conversation={conversation}
                key={conversation?._id}
              />
            ))}
      </ul>
    </div>
  );
};

export default Conversations;
