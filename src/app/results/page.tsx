"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { getInspections } from "../lib/actions";
import { getGeoInfo } from "../utils/helper";
import { Restaurant } from "../lib/types";
import { useRestaurantsStore } from "../lib/store";
import Map from "../components/Map";
import Link from "next/link";
import Card from "../components/Card";

function Results() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const updateLoading = useRestaurantsStore((state) => state.setLoading);
  const setRestaurants = useRestaurantsStore((state) => state.setRestaurants);
  const updateShowCard = useRestaurantsStore((state) => state.setShowCard);
  const restaurants = useRestaurantsStore((state) => state.restaurants);
  const setError = useRestaurantsStore((state) => state.setError);
  const error = useRestaurantsStore((state) => state.error);
  const loading = useRestaurantsStore((state) => state.loading);
  useEffect(() => {
    console.log(search);
    updateLoading(true);
    async function fetchData() {
      if (!search) return;

      const returnedRestaurants = await getInspections(search);
      if (returnedRestaurants.error) {
        setError(returnedRestaurants.error);
        return;
      }

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
      console.log(newRestaurants);
      updateLoading(false);
      updateShowCard(true);
    }
    fetchData();
  }, [search]);

  if (loading) {
    return (
      <div>
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }
  return error ? (
    <div className="text-red-500 text-center mb-4 italic text-lg font-bold mt-20">
      {error}
    </div>
  ) : (
    <div className="w-full md:w-1/2 aspect-square md:aspect-[1.2/1] relative mx-auto">
      <Map />
      {restaurants.map((restaurant) => (
        <Card key={restaurant.Name} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default function ResultsPage() {
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
