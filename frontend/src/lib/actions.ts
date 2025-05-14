"use server";

import { GET_ESTABLISHMENTS_BY_SEARCH_TERM } from "@/gql/queries";
import { useQuery } from "@apollo/client";

export async function getInspectionsUsingAPI(search: string) {
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

export async function getEstablishmentsBySearchTerm(searchTerm: string) {
  const { data, error } = useQuery(GET_ESTABLISHMENTS_BY_SEARCH_TERM, {
    variables: { searchTerm },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
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
