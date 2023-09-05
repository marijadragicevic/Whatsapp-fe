import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ReturnIcon, ValidIcon } from "../../../svg";
import UnderlineInput from "./UnderlineInput";
import MultipleSelect from "./MultipleSelect";
import { ClipLoader } from "react-spinners";

const CreateGroup = ({ setShowCreateGroup }) => {
  const { user } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.chat);
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const selectHandler = (users) => {
    setSelectedUsers(users);
  };

  const searchHandler = async (event) => {
    const keyword = event.target.value;
    const pressedKey = event.key;

    if (keyword && pressedKey === "Enter") {
      setSearchResults([]);
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

        if (data?.length > 0) {
          let tempArray = data.map((user) => {
            let temp = {
              value: user?._id,
              label: user?.name,
              picture: user?.picture,
            };

            return temp;
          });

          setSearchResults(tempArray);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
      {/* Container */}
      <div className="mt-5">
        {/* Returning / close button */}
        <button
          className="btn w-6 h-6 "
          type="button"
          onClick={() => setShowCreateGroup(false)}
        >
          <ReturnIcon className="fill-white" />
        </button>
        {/* Group name input */}
        <UnderlineInput name={name} onNameChange={nameHandler} />
        {/* Multiple select */}
        <MultipleSelect
          onSearch={searchHandler}
          searchResults={searchResults}
          onSelectionChange={selectHandler}
        />
        {/* Create group button */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
          <button
            className="btn  bg-green_1 scale-150 hover:bg-green-500"
            type="button"
          >
            {status === "loading" ? (
              <ClipLoader color="#e9edef" size={25} />
            ) : (
              <ValidIcon className="fill-white mt-2 h-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
