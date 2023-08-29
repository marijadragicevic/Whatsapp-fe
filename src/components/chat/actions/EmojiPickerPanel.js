import EmojiPicker from "emoji-picker-react";
import { CloseIcon, EmojiIcon } from "../../../svg";
import { useEffect, useState } from "react";

const EmojiPickerPanel = ({ textRef, message, setMessage }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);

  const handleEmoji = (emojiData, event) => {
    const { emoji } = emojiData;
    const ref = textRef?.current;

    ref.focus();

    const cursorPosition = ref.selectionStart;

    const start = message?.substring(0, cursorPosition);
    const end = message?.substring(cursorPosition);
    const newText = start + emoji + end;

    const newCursorPosition = start?.length + emoji?.length;

    setMessage(newText);
    setCursorPosition(newCursorPosition);
  };

  useEffect(() => {
    if (textRef?.current) {
      textRef?.current?.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() => setShowPicker((prevState) => !prevState)}
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {/* Emoji picker */}
      {showPicker && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
};

export default EmojiPickerPanel;
