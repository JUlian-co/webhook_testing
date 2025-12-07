import { db } from "@/db/db";
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, userId } = await req.json();
  console.log("name and userid in route: ", name, userId);

  await db.insert(companies).values({ name: name, userId: userId });

  return NextResponse.json({ message: "company created" }, { status: 200 });
}

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  const coms = await db
    .select()
    .from(companies)
    .where(eq(companies.userId, userId));
  console.log("coms from db: ", coms);

  return NextResponse.json({ companies: coms }, { status: 200 });
}
