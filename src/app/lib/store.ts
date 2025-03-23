import { create } from "zustand";
import { Restaurant } from "./types";
import { getInspections } from "./actions";
import { getGeoInfo } from "../utils/helper";

export type State = {
  loading: boolean;
  showResults: boolean;
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  error: string | null;
  searchTerm: string;
};

type Actions = {
  setLoading: (loading: boolean) => void;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  setShowResults: (showResults: boolean) => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (searchTerm: string) => void;
  search: (searchTerm: string) => void;
  fetchRestaurants: () => Promise<void>;
};

export const useRestaurantsStore = create<State & Actions>()((set, get) => ({
  error: null,
  loading: false,
  showResults: false,
  restaurants: [],
  selectedRestaurant: null,
  searchTerm: "",

  setLoading: (loading: boolean) => set({ loading }),
  setSelectedRestaurant: (selectedRestaurant: Restaurant | null) =>
    set({ selectedRestaurant }),
  setShowResults: (showResults: boolean) => set({ showResults }),
  setRestaurants: (restaurants: Restaurant[]) => set({ restaurants }),
  setError: (error: string | null) => set({ error }),

  setSearchTerm: (searchTerm: string) => set({ searchTerm }),

  search: (searchTerm: string) => {
    if (get().searchTerm.trim() === searchTerm.trim()) return;
    set({ searchTerm: searchTerm.trim() });
    get().fetchRestaurants();
  },

  fetchRestaurants: async () => {
    const searchTerm = get().searchTerm;
    if (!searchTerm.trim()) return;

    set({ loading: true, error: null });
    try {
      const returnedRestaurants = await getInspections(searchTerm);
      if (returnedRestaurants.error) {
        set({ loading: false, error: returnedRestaurants.error });
        return;
      }
      console.log(returnedRestaurants, "returnedRestaurants");
      const restaurantsWithLocation: Restaurant[] = await Promise.all(
        returnedRestaurants.map(async (restaurant: Restaurant) => {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
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
      set({
        restaurants: restaurantsWithLocation,
        loading: false,
        showResults: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: "An unknown error occurred", loading: false });
      }
    }
  },
}));
