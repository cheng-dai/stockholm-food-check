"use client";
import { AnimatePresence, motion } from "motion/react";
import { useRestaurantsStore } from "../lib/store";
import Card from "./Card";

export function Results() {
  const { showResults, restaurants, loading } = useRestaurantsStore();
  if (loading)
    return (
      <div className="text-center text-lg font-bold flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path
              strokeDasharray={16}
              strokeDashoffset={16}
              d="M12 3c4.97 0 9 4.03 9 9"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="16;0"
              ></animate>
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              ></animateTransform>
            </path>
            <path
              strokeDasharray={64}
              strokeDashoffset={64}
              strokeOpacity={0.3}
              d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="1.2s"
                values="64;0"
              ></animate>
            </path>
          </g>
        </svg>
      </div>
    );

  if (!loading && restaurants.length === 0)
    return (
      <div className="text-center text-lg font-bold">No results found</div>
    );
  return (
    <AnimatePresence>
      {showResults && (
        <motion.div
          className="flex w-full relative mx-auto flex-col md:flex-row gap-8"
          key={restaurants.length}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="w-full rounded-lg">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.Name} restaurant={restaurant} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
