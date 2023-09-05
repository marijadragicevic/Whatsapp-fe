import Select from "react-select";

const MultipleSelect = ({ onSearch, onSelectionChange, searchResults }) => {
  return (
    <div className="mt-4">
      <Select
        options={searchResults}
        onChange={onSelectionChange}
        onKeyDown={onSearch}
        formatOptionLabel={(user) => {
          return (
            <div className="flex items-center gap-1">
              <img
                src={user.picture}
                className="w-8 h-8 object-cover rounded-full"
              />
              <span className="text-[#222]">{user?.label}</span>
            </div>
          );
        }}
        placeholder="Serach, select users"
        isMulti={true}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: "none",
            borderColor: "transparent",
            backgroundColor: "transparent",
          }),
        }}
      />
    </div>
  );
};

export default MultipleSelect;
