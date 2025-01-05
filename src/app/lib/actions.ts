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
    }
  );
  const data = await inspections.json();
  console.log(data);
  if (data.length === 0) {
    return {
      error:
        "No results found, please try searching for a different restaurant",
    };
  }
  if (data.length > 5) {
    return {
      error: "Too many results, please narrow your search",
    };
  }

  return data;
}
