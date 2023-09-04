import { useSelector } from "react-redux";
import {
  CallIcon,
  DotsIcon,
  SearchLargeIcon,
  VideoCallIcon,
} from "../../../svg";
import { capitalize } from "../../../utils/string";
import { useEffect, useState } from "react";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";

const ChatHeader = ({ online, callUser }) => {
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const { users } = activeConversation;

  const [userReceiver, setUserReceiver] = useState({
    name: "",
    picture: "",
  });

  const { name, picture } = userReceiver;

  useEffect(() => {
    const receiverName = getConversationName(user, users);
    const receiverPicture = getConversationPicture(user, users);

    setUserReceiver({
      name: receiverName && capitalize(receiverName),
      picture: receiverPicture,
    });
  }, [activeConversation, user]);

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none overflow-hidden ">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-x-4">
          {/* Conversation image */}
          <button className="btn">
            <img
              src={picture}
              alt={`${name} picture`}
              className="w-full h-full rounded-full object-cover "
            />
          </button>
          {/* Conversation name and online status */}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {capitalize(name)}
            </h1>
            <span className="text-xs dark:text-dark_svg_1">
              {online && "online"}
            </span>
          </div>
        </div>
        {/* Right */}
        <ul className="flex items-center gap-x-2.5">
          {1 == 1 && (
            <li onClick={() => callUser()}>
              <button className="btn">
                <VideoCallIcon />
              </button>
            </li>
          )}
          {1 == 1 && (
            <li>
              <button className="btn">
                <CallIcon />
              </button>
            </li>
          )}
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
