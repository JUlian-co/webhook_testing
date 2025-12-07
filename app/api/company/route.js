import { db } from "@/db/db";
import { companies } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, userId } = await req.json();
  console.log("name and userid in route: ", name, userId);

  await db.insert(companies).values({ name: name, userId: userId });

  return NextResponse.json({ message: "company created" }, { status: 200 });
}
