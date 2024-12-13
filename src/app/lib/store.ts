import { create } from "zustand";
import { Restaurant } from "./types";

type State = {
  loading: boolean;
  showCard: boolean;
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
};

type Actions = {
  setLoading: (loading: boolean) => void;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
  setShowCard: (showCard: boolean) => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
};

export const useRestaurantsStore = create<State & Actions>((set) => ({
  loading: false,
  showCard: false,
  restaurants: [],
  selectedRestaurant: null,
  setLoading: (loading: boolean) => set({ loading }),
  setSelectedRestaurant: (selectedRestaurant: Restaurant | null) =>
    set({ selectedRestaurant }),
  setShowCard: (showCard: boolean) => set({ showCard }),
  setRestaurants: (restaurants: Restaurant[]) => set({ restaurants }),
}));
