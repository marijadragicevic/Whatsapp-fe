import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/ChatSlice";
import { Sidebar } from "../components/sidebar";
import { ChatPanel, WhatsAppHome } from "../components/chat";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

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

export default Home;
