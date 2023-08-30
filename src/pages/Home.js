import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/ChatSlice";
import { Sidebar } from "../components/sidebar";
import { ChatPanel, WhatsAppHome } from "../components/chat";
import SocketContext from "../context/SocketContext";

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const [onlineUsers, setOnlineUsers] = useState([]);

  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user?._id);
    // get online users
    socket.on("get-online-users", (users) => {
      console.log(users, "onlineUsers");
      setOnlineUsers(users);
    });
  }, [user]);

  // get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  // listening to receiving message
  useEffect(() => {
    // this doesnt work properly
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
      // console.log("receive message --->", message);
    });
  }, []);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="container h-screen flex py-[19px]">
        {/* Sidebar */}
        <Sidebar onlineUsers={onlineUsers} />
        {activeConversation && Object.keys(activeConversation)?.length > 0 ? (
          <ChatPanel onlineUsers={onlineUsers} />
        ) : (
          <WhatsAppHome />
        )}
      </div>
    </div>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
