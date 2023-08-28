import ChatHeader from "./header/ChatHeader";

const ChatPanel = () => {
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_bg_2 select-none overflow-hidden">
      {/* Container */}
      <div>
        {/* Chat header */}
        <ChatHeader />
      </div>
    </div>
  );
};

export default ChatPanel;
