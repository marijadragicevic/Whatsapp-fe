import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

const Sidebar = ({ onlineUsers }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* Sidebar header */}
      <SidebarHeader />
      {/* Notifications */}
      <Notifications />
      {/* Search */}
      <Search
        searchLength={searchResults?.length}
        setSearchResults={handleSearchResults}
      />
      {searchResults?.length > 0 ? (
        <SearchResults
          searchResults={searchResults}
          setSearchResults={handleSearchResults}
        />
      ) : (
        <Conversations onlineUsers={onlineUsers} />
      )}
    </div>
  );
};

export default Sidebar;
