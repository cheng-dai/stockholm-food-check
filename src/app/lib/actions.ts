"use server";

export async function getInspections(search: string) {
  const inspections = await fetch(
    "https://etjanster.stockholm.se/Livsmedelsinspektioner/Livsmedelsinspektioner/SearchFacilitiesMap",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FoodPlaceName: search,
        FoodPlaceAddress: "",
        FoodPlaceOrgNr: "",
        NoDeficiency: false,
        MinorDeficiency: false,
        Revisit: false,
        FacilityTypeGroups: [],
        NorthCoordinate: null,
        EastCoordinate: null,
        MaxDistanceAllowedFromPoint: null,
      }),
      cache: "no-store",
    }
  );

  return inspections.json();
}

export async function fetchAllRestaurants() {
  // Use the same API endpoint as your getInspections function but with an empty search
  // to get all restaurants
  const inspections = await fetch(
    "https://etjanster.stockholm.se/Livsmedelsinspektioner/Livsmedelsinspektioner/SearchFacilitiesMap",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FoodPlaceName: "",
        FoodPlaceAddress: "",
        FoodPlaceOrgNr: "",
        NoDeficiency: false,
        MinorDeficiency: false,
        Revisit: false,
        FacilityTypeGroups: [],
        NorthCoordinate: null,
        EastCoordinate: null,
        MaxDistanceAllowedFromPoint: null,
      }),
    }
  );

  const data = await inspections.json();
  return data;
}
