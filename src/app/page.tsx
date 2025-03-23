"use client";
import Map from "./components/Map";
import { Results } from "./components/Results";
import Search from "./components/Search";
import { useRestaurantsStore } from "./lib/store";

export default function Home() {
  const loading = useRestaurantsStore((state) => state.loading);

  return (
    <div className="flex flex-col md:flex-row mt-20 gap-10 md:align-top md:gap-40">
      <div className="flex-1 flex flex-col gap-4">
        <Search />
        {!loading && <Results />}
      </div>

      <div className="w-full md:w-[40%] aspect-square relative mx-auto">
        <Map />
        {loading && (
          <div className="flex justify-center items-center w-full h-full z-50 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg rounded-lg">
            <p className="text-xl font-bold">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
