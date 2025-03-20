"use client";
import { useRestaurantsStore } from "../lib/store";

export function Results() {
  const { loading, showResults } = useRestaurantsStore();

  if (loading) return <div>Loading...</div>;
  // if (restaurants.length === 0)
  //   return (
  //     <div className="text-center text-lg font-bold">No results found</div>
  //   );
  return (
    showResults && (
      <div className="flex w-full md:w-1/2 relative mx-auto flex-col md:flex-row gap-8">
        <div>
          {/* <div className="border-2 border-gray-200 rounded-md p-4 w-full overflow-y-auto">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.Name} restaurant={restaurant} />
            ))}
          </div> */}
        </div>
      </div>
    )
  );
}
