import { AttachmentIcon } from "../../../svg";

const Attachments = () => {
  return (
    <li className="relative">
      <button className="btn" type="button">
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* Emoji picker */}
    </li>
  );
};

export default Attachments;
