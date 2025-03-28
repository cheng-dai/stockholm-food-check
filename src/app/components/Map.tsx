"use client";
import { Map as MapGL } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import { useRestaurantsStore } from "../lib/store";
import { Marker } from "react-map-gl/maplibre";
import { SadFace, SmileFace, Question } from "./icons";
import { passedMostRecentInspection } from "../lib/helpers";

const DARK_STYLE =
  "https://api.protomaps.com/styles/v2/black.json?key=751d67441e149bdf";

export default function Map() {
  const restaurants = useRestaurantsStore((state) => state.restaurants);
  const setSelectedRestaurant = useRestaurantsStore(
    (state) => state.setSelectedRestaurant
  );
  const [viewState, setViewState] = useState({
    latitude: 59.334591,
    longitude: 18.06324,
    zoom: 12,
  });

  const getMapBounds = () => {
    if (restaurants.length === 0) {
      return {
        latitude: 59.334591,
        longitude: 18.06324,
        zoom: 12,
      };
    }

    const lats = restaurants.map((r) => Number(r.lat));
    const lons = restaurants.map((r) => Number(r.lon));

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    // Calculate center
    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2;

    // Calculate appropriate zoom level
    const latDiff = maxLat - minLat;
    const lonDiff = maxLon - minLon;
    const maxDiff = Math.max(latDiff, lonDiff);
    console.log(maxDiff, "maxDiff");

    // Adjust these values to fine-tune the zoom level
    let zoom = 12;
    if (maxDiff > 0.15) zoom = 9;
    if (maxDiff > 0.3) zoom = 8;
    if (maxDiff > 0.6) zoom = 7;
    if (maxDiff > 1.2) zoom = 6;

    return {
      latitude: centerLat,
      longitude: centerLon,
      zoom: zoom,
    };
  };

  useEffect(() => {
    setViewState(getMapBounds());
  }, [restaurants]);

  return (
    <MapGL
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "100%", borderRadius: "8px" }}
      mapStyle={DARK_STYLE}
    >
      {restaurants.length > 0 &&
        restaurants.map((restaurant) => (
          <div key={restaurant.Id}>
            <Marker
              latitude={Number(restaurant.lat)}
              longitude={Number(restaurant.lon)}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedRestaurant(restaurant);
              }}
              className="cursor-pointer"
            >
              {passedMostRecentInspection(restaurant) === "yes" ? (
                <SmileFace />
              ) : passedMostRecentInspection(restaurant) === "no" ? (
                <SadFace />
              ) : (
                <Question />
              )}
            </Marker>
          </div>
        ))}
    </MapGL>
  );
}
