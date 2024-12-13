"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { getInspections } from "../lib/actions";
import { getGeoInfo } from "../utils/helper";
import { Restaurant } from "../lib/types";
import { useRestaurantsStore } from "../lib/store";
import Map from "../components/Map";
import Link from "next/link";
function Results() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const loading = useRestaurantsStore((state) => state.loading);
  const updateLoading = useRestaurantsStore((state) => state.setLoading);
  const setRestaurants = useRestaurantsStore((state) => state.setRestaurants);
  const updateShowCard = useRestaurantsStore((state) => state.setShowCard);
  useEffect(() => {
    console.log(search);
    updateLoading(true);
    async function fetchData() {
      if (!search) return;

      const returnedRestaurants = await getInspections(search);

      const newRestaurants: Restaurant[] = await Promise.all(
        returnedRestaurants.map(async (restaurant: Restaurant) => {
          const [locationData] = await getGeoInfo(restaurant);
          if (locationData === "failed") {
            return null;
          }
          const { lat, lon } = locationData;

          return {
            ...restaurant,
            lat,
            lon,
          };
        })
      );
      setRestaurants(newRestaurants);
      updateLoading(false);
      updateShowCard(true);
    }
    fetchData();
  }, [search]);

  return (
    <div className="w-full md:w-1/2 aspect-square md:aspect-[1.2/1] relative mx-auto">
      <Map />
      {loading && (
        <div className="flex justify-center items-center w-full h-full z-50 absolute top-0 left-0 right-0 bottom-0 bg-white/50 rounded-lg">
          <p className="text-xl font-bold">Loading...</p>
        </div>
      )}
    </div>
  );
}
export default function Search() {
  return (
    <div className=" flex flex-col items-center">
      <Link href="/" className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Back to Search
        </button>
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Results />
      </Suspense>
    </div>
  );
}
