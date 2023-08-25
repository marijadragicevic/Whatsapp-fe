import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search } from "./search";

const Sidebar = () => {
  const [searchResults, setSetSearchResults] = useState([]);
  return (
    <div className="w-[40%] h-full select-none">
      {/* Sidebar header */}
      <SidebarHeader />
      {/* Notifications */}
      <Notifications />
      {/* Search */}
      <Search searchLength={searchResults?.length} />
    </div>
  );
};

export default Sidebar;
