import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search } from "./search";
import { Conversations } from "./conversations";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="w-[40%] h-full select-none">
      {/* Sidebar header */}
      <SidebarHeader />
      {/* Notifications */}
      <Notifications />
      {/* Search */}
      <Search
        searchLength={searchResults?.length}
        setSearchResults={handleSearchResults}
      />
      {/* Conversations list */}
      <Conversations />
    </div>
  );
};

export default Sidebar;
