import { useState } from "react";
import { useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
import Menu from "./Menu";
import { CreateGroup } from "../createGroup";

const SidebarHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const { user } = useSelector((state) => state.user);

  const handleShowCreateGroup = (value) => {
    setShowCreateGroup(value);
  };

  return (
    <>
      {/* Header */}
      <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
        {/* Container */}
        <div className="w-full flex items-center justify-between">
          {/* User image */}
          <button className="btn">
            <img
              src={user.picture}
              alt={user?.name}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/* User icons */}
          <ul className="flex items-center gap-x-2.5">
            <li>
              <button className="btn">
                <CommunityIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <StoryIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <ChatIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li
              className="relative"
              onClick={() => setShowMenu((prevState) => !prevState)}
            >
              <button className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}>
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
              {showMenu && <Menu setShowCreateGroup={handleShowCreateGroup} />}
            </li>
          </ul>
        </div>
      </div>
      {/* Create group */}
      {showCreateGroup && (
        <CreateGroup setShowCreateGroup={handleShowCreateGroup} />
      )}
    </>
  );
};

export default SidebarHeader;
