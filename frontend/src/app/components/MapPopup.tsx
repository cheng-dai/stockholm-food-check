import { Restaurant } from "../../../../backend/src/lib/types";
import { Popup } from "react-map-gl";
import { v4 as uuidv4 } from "uuid";
import { useRestaurantsStore } from "../../../../backend/src/lib/store";

export default function MapPopup({ restaurant }: { restaurant: Restaurant }) {
  const { setSelectedRestaurant } = useRestaurantsStore();
  function translateResult(result: string) {
    if (
      result ===
      "Vid den senaste inspektionen konstaterades inga avvikelser i de områden vi kontrollerade"
    ) {
      return "Passed";
    } else if (result === "Vid inspektionen konstaterades avvikelser") {
      return "Failed";
    } else {
      return "Lack of results";
    }
  }

  return (
    <Popup
      latitude={Number(restaurant.lat)}
      longitude={Number(restaurant.lon)}
      onClose={() => setSelectedRestaurant(null)}
      offset={10}
      style={{
        color: "black",
      }}
      closeButton={false}
    >
      <h2 className="md:text-lg font-bold text-center">{restaurant.Name}</h2>
      <p className="text-xs md:text-sm text-center">{restaurant.Address}</p>

      {restaurant.InspectionList.length === 0 ? (
        <p className="text-sm text-center font-bold mt-2">
          No Inspection Results
        </p>
      ) : (
        <div>
          {restaurant.InspectionList.slice(0, 5).map((inspection) => (
            <div className="flex gap-2" key={uuidv4()}>
              <p className="text-sm">{inspection.InspectionDate}</p>
              <p
                className={`text-sm font-bold ${
                  translateResult(inspection.SummaryText) === "Passed"
                    ? "text-green-500"
                    : translateResult(inspection.SummaryText) ===
                        "Lack of results"
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {translateResult(inspection.SummaryText)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Popup>
  );
}
