import React, { useState } from "react";
import { useRestaurantsStore } from "../lib/store";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { search, setShowResults } = useRestaurantsStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(inputValue);
    setInputValue("");
    setShowResults(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
