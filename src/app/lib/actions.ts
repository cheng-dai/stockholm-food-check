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
  return inspections.json();
}