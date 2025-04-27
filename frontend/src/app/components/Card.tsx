import { v4 as uuidv4 } from "uuid";
import { Restaurant } from "../../../../backend/src/lib/types";

export default function Card({ restaurant }: { restaurant: Restaurant }) {
  function translateResult(result: string) {
    if (
      result ===
      "Vid den senaste inspektionen konstaterades inga avvikelser i de områden vi kontrollerade"
    ) {
      return <div className="h-4 w-4 rounded-full bg-green-500/80"></div>;
    } else if (result === "Vid inspektionen konstaterades avvikelser") {
      return <div className="h-4 w-4 rounded-full bg-red-500/80"></div>;
    } else {
      return <div className="h-4 w-4 rounded-full bg-yellow-500/80"></div>;
    }
  }
  return (
    <div className="flex flex-col items-start justify-center rounded-xl p-4 border border-gray-600/30">
      <div className="flex justify-between items-center gap-2 w-full">
        <h2 className="md:text-lg font-bold text-center">{restaurant.Name}</h2>
        {/* TODO: add collection function */}
        {/* <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
            ></path>
          </svg>
          <p className="text-xs">(coming soon)</p>
        </div> */}
      </div>
      <div className="flex justify-between items-center">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${restaurant.Name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <p className="text-xs md:text-sm underline">{restaurant.Address}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M362.666 149.333V320H320l-.001-97.831l-154.51 154.51l-30.169-30.17L289.829 192h-97.83v-42.666z"
            ></path>
          </svg>
        </a>
      </div>
      <p className="font-bold mt-4 mb-2">Inspection results</p>
      {restaurant.InspectionList.length === 0 ? (
        <p className="font-mono mt-2 text-balance">
          No inspection results found. This might be a new restaurant.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {restaurant.InspectionList.slice(0, 5).map((inspection) => (
            <div
              className="flex gap-4 items-center justify-between"
              key={uuidv4()}
            >
              <p className="text-sm font-mono">{inspection.InspectionDate}</p>

              {translateResult(inspection.SummaryText)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
