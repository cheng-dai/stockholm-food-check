"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useRestaurantsStore } from "../lib/store";

export default function Search() {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const updateLoading = useRestaurantsStore((state) => state.setLoading);
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim() === "") {
      // toast.error("Please enter a search term");
      console.log(inputRef.current);
      if (inputRef.current) {
        inputRef.current.reportValidity();
      }
      return;
    }
    updateLoading(true);
    router.push(`/results?q=${search}`);
  };

  return (
    <div className="flex justify-center items-center mb-4 md:mb-8">
      <input
        ref={inputRef}
        required
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search a restaurant"
        className="w-1/2 md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md shadow-md"
      >
        Search
      </button>
      <ToastContainer />
    </div>
  );
}
