import { useDispatch, useSelector } from "react-redux";
import { dateHandler } from "../../../utils/date";
import { openOrCreateConversation } from "../../../features/ChatSlice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import { capitalize } from "../../../utils/string";
import SocketContext from "../../../context/SocketContext";

const Conversation = ({ conversation, socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const values = {
    receiverId: getConversationId(user, conversation?.users),
    token: user?.token,
  };

  const openConversation = async () => {
    const newConversation = await dispatch(openOrCreateConversation(values));
    socket.emit("join conversation", newConversation?.payload?._id);
  };

  return (
    <li
      onClick={openConversation}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${
        conversation?._id === activeConversation?._id ? "" : "dark:bg-dark_bg_2"
      } transition ease-in duration-200 cursor-pointer dark:text-dark_text_1 px-[10px] ${
        conversation?._id === activeConversation?._id
          ? " dark:bg-dark_hover_1"
          : ""
      }`}
    >
      {/* Container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* Left */}
        <div className="flex items-center gap-x-3">
          {/* Conversation user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={getConversationPicture(user, conversation?.users)}
              alt={getConversationName(user, conversation?.users)}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Conversation name and message */}
          <div className="w-full flex flex-col">
            {/* Conversation name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {capitalize(getConversationName(user, conversation?.users))}
            </h1>
            {/* Conversation message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {conversation?.latestMessage?.message?.length > 20
                      ? `${conversation.latestMessage.message.substring(
                          0,
                          20
                        )}...`
                      : conversation.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {conversation?.latestMessage?.createdAt &&
              dateHandler(conversation?.latestMessage?.createdAt)}
          </span>
        </div>
      </div>
      {/* Border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

const ConversationWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithContext;
