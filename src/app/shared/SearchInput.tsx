import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onSearch,
  placeholder = "Search...",
}) => (
  <div className="flex justify-center items-center gap-2 py-4 w-full">
    <input
      type="text"
      className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400 transition-shadow flex-1 min-w-0"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
    <button
      className="bg-[#2563eb] text-white px-5 py-2 rounded-full shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      onClick={onSearch}
    >
      Search
    </button>
  </div>
);

export default SearchInput; 