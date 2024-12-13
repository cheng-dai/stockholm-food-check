import { useRestaurantsStore } from "../lib/store";
export default function Card() {
  const restaurant = useRestaurantsStore((state) => state.restaurants[0]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">{restaurant.Name}</h2>
      <p>{restaurant.Address}</p>
      <p>{restaurant.InspectionList[0].SummaryColour}</p>
    </div>
  );
}
