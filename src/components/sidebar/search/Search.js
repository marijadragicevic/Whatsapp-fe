import { useState } from "react";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
import axios from "axios";
import { useSelector } from "react-redux";

const Search = ({ searchLength, setSearchResults }) => {
  const [show, setSetShow] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleSearch = async (event) => {
    const keyword = event.target.value;
    const pressedKey = event.key;

    if (keyword && pressedKey === "Enter") {
      // Search api

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setSearchResults(data);
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="h=[49px] py-1.5">
      {/* Container */}
      <div className="px-[10px]">
        {/* Search input container */}
        <div className="flex items-center gap-x-2 ">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation"
                onClick={() => setSearchResults([])}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start new chat"
              className="input"
              onFocus={() => setSetShow(true)}
              onBlur={() => searchLength === 0 && setSetShow(false)}
              onKeyDown={handleSearch}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
