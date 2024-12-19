"use client";
import Map from "./components/Map";
import Search from "./components/Search";
import { useRestaurantsStore } from "./lib/store";
import { useEffect } from "react";
export default function Home() {
  const loading = useRestaurantsStore((state) => state.loading);
  const updateError = useRestaurantsStore((state) => state.setError);
  const updateLoading = useRestaurantsStore((state) => state.setLoading);
  const updateRestaurants = useRestaurantsStore(
    (state) => state.setRestaurants
  );
  useEffect(() => {
    updateError(null);
    updateRestaurants([]);
    updateLoading(false);
  }, []);

  return (
    <div>
      <p className="text-center italic text-sm mb-4">
        restaurants inspection results within Stockholm Stad
      </p>
      <Search />
      <div className="md:w-1/2 aspect-square md:aspect-[1.2/1] relative mx-auto">
        <Map />
        {loading && (
          <div className="flex justify-center items-center w-full h-full z-50 absolute top-0 left-0 right-0 bottom-0 bg-white/50 rounded-lg">
            <p className="text-xl font-bold">Loading...</p>
          </div>
        )}
      </div>
      {/* {showCard && (
        <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md shadow-md absolute bottom-0 left-0 right-0  z-10">
          <Card />
        </div>
      )} */}
    </div>
  );
}
