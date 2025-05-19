import { Restaurant } from "./types";
import { fetchAllRestaurants } from "./actions";

// New function to fetch and store all restaurants weekly
export async function fetchAndStoreAllRestaurants() {
  try {
    // Fetch all restaurants from your data source
    const restaurants = await fetchAllRestaurants();

    // Store the results in your database
    // await storeRestaurantsInDatabase(restaurants);

    console.log(
      `Successfully fetched and stored ${
        restaurants.length
      } restaurants at ${new Date().toISOString()}`,
    );
    return { success: true, count: restaurants.length };
  } catch (error) {
    console.error("Error in weekly restaurant fetch:", error);
    return { success: false, error };
  }
}

export function passedMostRecentInspection(restaurant: Restaurant) {
  for (let i = 0; i < restaurant.InspectionList.length; i++) {
    if (restaurant.InspectionList[i].SummaryColour.includes("success")) {
      return "yes";
    } else if (restaurant.InspectionList[i].SummaryColour.includes("warning")) {
      return "no";
    }
  }
  return "unknown";
}

export async function getGeoInfo(restaurant: Restaurant) {
  try {
    const geoInfo = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${restaurant.Address}&format=jsonv2`,
    );
    return geoInfo.json();
  } catch (error) {
    console.error(error);
    return "failed";
  }
}
