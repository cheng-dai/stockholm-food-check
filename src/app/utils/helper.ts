import { Restaurant } from "../lib/types";

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
      `https://nominatim.openstreetmap.org/search.php?q=${restaurant.Address}&format=jsonv2`
    );
    return geoInfo.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
