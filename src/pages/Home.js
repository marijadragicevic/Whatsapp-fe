import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/ChatSlice";
import { Sidebar } from "../components/sidebar";
import { ChatPanel, WhatsAppHome } from "../components/chat";
import SocketContext from "../context/SocketContext";

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user?._id);
  }, [user]);

  // get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="container h-screen flex py-[19px]">
        {/* Sidebar */}
        <Sidebar />
        {activeConversation && Object.keys(activeConversation)?.length > 0 ? (
          <ChatPanel />
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
