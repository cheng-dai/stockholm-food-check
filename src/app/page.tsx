"use client";
import Map from "./components/Map";
import Search from "./components/Search";
import Card from "./components/Card";
import { useRestaurantsStore } from "./lib/store";
export default function Home() {
  const showCard = useRestaurantsStore((state) => state.showCard);
  const loading = useRestaurantsStore((state) => state.loading);

  return (
    <div>
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
