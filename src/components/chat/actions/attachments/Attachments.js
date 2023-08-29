import { useState } from "react";
import { AttachmentIcon, CloseIcon } from "../../../../svg";
import Menu from "./Menu.js";

const Attachments = ({
  showAttachments,
  setShowAttachments,
  setShowPicker,
}) => {
  return (
    <li className="relative">
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShowPicker(false);
          setShowAttachments((prevState) => !prevState);
        }}
      >
        {showAttachments ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <AttachmentIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {/* Menu */}
      {showAttachments ? <Menu /> : ""}
    </li>
  );
};

export default Attachments;
