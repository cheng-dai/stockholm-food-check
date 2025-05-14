import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json("吃了会死。");
}
