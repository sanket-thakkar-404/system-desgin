import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <div className="w-full relative">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors"
        size={20}
      />
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={onChange}
        className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
      />
    </div>
  );
};

export default SearchBar;
