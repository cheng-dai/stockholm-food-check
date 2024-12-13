"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handelSearch = () => {
    router.push(`/results?q=${search}`);
  };

  return (
    <div className="flex justify-center items-center mb-4 md:mb-8">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search a restaurant"
        className="w-1/2 md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
      />
      <button
        onClick={handelSearch}
        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md shadow-md"
      >
        Search
      </button>
    </div>
  );
}
