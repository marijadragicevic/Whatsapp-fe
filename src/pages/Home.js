import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/ChatSlice";
import { Sidebar } from "../components/sidebar";
import { ChatPanel, WhatsAppHome } from "../components/chat";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";

const callData = {
  receivingCall: false,
  callEnded: false,
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  // call
  const [call, setCall] = useState(callData);
  const { receivingCall, callEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  // typing
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);

  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user?._id);
    // get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, [user]);

  useEffect(() => {
    // listening to receiving message
    // this doesnt work properly
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
      // console.log("receive message --->", message);
    });

    // listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
        {/* Container */}
        <div className="container h-screen flex py-[19px]">
          {/* Sidebar */}
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation && Object.keys(activeConversation)?.length > 0 ? (
            <ChatPanel onlineUsers={onlineUsers} typing={typing} />
          ) : (
            <WhatsAppHome />
          )}
        </div>
      </div>
      {/* Call */}
      <Call call={call} setCall={setCall} callAccepted={callAccepted} />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
