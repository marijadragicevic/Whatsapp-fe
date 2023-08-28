import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/ChatSlice";
import { Sidebar } from "../components/sidebar";
import { WhatsAppHome } from "../components/chat";

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
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="container h-screen flex">
        {/* Sidebar */}
        <Sidebar />
        {activeConversation && Object.keys(activeConversation)?.length > 0 ? (
          "home"
        ) : (
          <WhatsAppHome />
        )}
      </div>
    </div>
  );
};

export default Home;
