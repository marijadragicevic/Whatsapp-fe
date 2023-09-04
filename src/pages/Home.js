import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer";
import {
  getConversations,
  updateMessagesAndConversations,
} from "../features/ChatSlice";
import { Sidebar } from "../components/sidebar";
import { ChatPanel, WhatsAppHome } from "../components/chat";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../utils/chat";

const callData = {
  socketId: "",
  receivingCall: false,
  callEnded: false,
  name: "",
  picture: "",
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  // call
  const [show, setShow] = useState(false);
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const { receivingCall, callEnded, socketId } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  // typing
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);

  const setupMedia = async () => {
    const stream = await navigator?.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);
  };

  const enableMedia = useCallback(() => {
    myVideo.current.srcObject = stream;
    setShow(true);
  }, [stream]);

  // call user function
  const callUser = useCallback(() => {
    enableMedia();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation?.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("call accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }, [stream, activeConversation, user]);

  // answer call function
  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer call", { signal: data, to: call.socketId });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  // call
  useEffect(() => {
    setupMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });

    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });
  }, []);

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
            <ChatPanel
              onlineUsers={onlineUsers}
              typing={typing}
              callUser={callUser}
            />
          ) : (
            <WhatsAppHome />
          )}
        </div>
      </div>
      {/* Call */}
      <div className={show || (call.signal && !call.callEnded) ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          userVideo={userVideo}
          myVideo={myVideo}
          stream={stream}
          answerCall={answerCall}
          show={show}
        />
      </div>
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HomeWithSocket;
