"use client";
import { useRestaurantsStore } from "../lib/store";
import Card from "./Card";

export function Results() {
  const { loading, showResults, restaurants } = useRestaurantsStore();

  if (loading) return <div>Loading...</div>;
  if (restaurants.length === 0)
    return (
      <div className="text-center text-lg font-bold">No results found</div>
    );
  return (
    showResults && (
      <div className="flex w-full relative mx-auto flex-col md:flex-row gap-8">
        <div className="w-full rounded-lg">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.Name} restaurant={restaurant} />
          ))}
        </div>
      </div>
    )
  );
}
