import { EmojiIcon } from "../../../svg";

const EmojiPicker = () => {
  return (
    <li>
      <button className="btn" type="button">
        <EmojiIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* Emoji picker */}
    </li>
  );
};

export default EmojiPicker;
