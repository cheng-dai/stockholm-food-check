"use client";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import { useRestaurantsStore } from "../lib/store";
import { motion } from "motion/react";
export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { search, setShowResults } = useRestaurantsStore();
  console.log('"render search component"');
  return (
    <div>
      <h2 className="mb-6 text-green-600">Check the food inspection results</h2>
      <div className="flex justify-center items-center border border-gray-300 mb-4 md:mb-8 w-full rounded-full bg-gray-800">
        <input
          ref={inputRef}
          required
          onChange={(e) => {
            if (e.target.value === "") {
              setShowResults(false);
            }
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              (e.target as HTMLInputElement).value.trim() !== ""
            ) {
              search((e.target as HTMLInputElement).value);
            }
          }}
          type="text"
          placeholder="Search a restaurant"
          className="w-full px-4 py-2 rounded-full shadow-md focus:outline-none focus:border-transparent bg-gray-800"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-white rounded-full shadow-md aspect-square p-2"
          onClick={(e) => {
            e.preventDefault();
            if (inputRef.current && inputRef.current.value.trim() !== "") {
              search(inputRef.current.value);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            ></path>
          </svg>
        </motion.button>
        <ToastContainer />
      </div>
    </div>
  );
}
