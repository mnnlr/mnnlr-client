// Search.jsx
import React from 'react';
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
      <span className="material-icons text-black px-2">
      <IoSearch/>
      </span>
      <input
        type="text"
        placeholder="Type here..."
        className="outline-none p-2"
      />
    </div>
  );
};

export default Search;
