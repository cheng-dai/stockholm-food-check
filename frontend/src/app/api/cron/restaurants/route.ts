import { NextResponse } from "next/server";
import { fetchAndStoreAllRestaurants } from "../../../../../../backend/src/lib/helpers";

// This endpoint will be called by a scheduling service
export async function GET(request: Request) {
  // Optional: Validate a secret key to ensure only authorized calls run the job
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const result = await fetchAndStoreAllRestaurants();

  return NextResponse.json(result);
}
