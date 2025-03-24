"use client";
import { LayoutGroup, motion } from "motion/react";
import Map from "./components/Map";
import { Results } from "./components/Results";
import Search from "./components/Search";
import { useRestaurantsStore } from "./lib/store";

export default function Home() {
  const loading = useRestaurantsStore((state) => state.loading);
  const searchTerm = useRestaurantsStore((state) => state.searchTerm);
  return (
    <div className="flex flex-col md:flex-row mt-20 gap-10 md:align-top md:gap-40">
      <LayoutGroup>
        <motion.div
          className="flex-1 flex flex-col gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Search />
          {searchTerm && <Results />}
        </motion.div>

        <motion.div
          className="w-full md:w-[40%] aspect-square relative mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Map />
          {loading && (
            <div className="flex justify-center items-center w-full h-full z-50 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg rounded-lg">
              <p className="text-xl font-bold">Loading...</p>
            </div>
          )}
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
