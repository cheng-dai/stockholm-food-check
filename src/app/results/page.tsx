"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { getInspections } from "../lib/actions";
import { getGeoInfo } from "../utils/helper";
import { Restaurant } from "../lib/types";
import { useRestaurantsStore } from "../lib/store";
import Map from "../components/Map";
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
    <div className="mt-20">
      <div className="md:w-1/2 aspect-square md:aspect-[1.2/1] relative mx-auto">
        <Map />
        {loading && (
          <div className="flex justify-center items-center w-full h-full z-50 absolute top-0 left-0 right-0 bottom-0 bg-white/50 rounded-lg">
            <p className="text-xl font-bold">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Results />
    </Suspense>
  );
}
