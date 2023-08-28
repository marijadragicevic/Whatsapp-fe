import { useSelector } from "react-redux";
import { Conversation } from "./index";

const Conversations = () => {
  const { conversations } = useSelector((state) => state.chat);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations?.length > 0 &&
          conversations?.map((conversation) => (
            <Conversation conversation={conversation} key={conversation?._id} />
          ))}
      </ul>
    </div>
  );
};

export default Conversations;
