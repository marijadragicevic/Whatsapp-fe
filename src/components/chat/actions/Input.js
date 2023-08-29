const Input = ({ message, setMessage, textRef }) => {
  return (
    <div className="w-full ">
      <input
        ref={textRef}
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
    </div>
  );
};

export default Input;
