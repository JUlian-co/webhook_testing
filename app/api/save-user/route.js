import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name } = await req.json();

  console.log("name in route: ", name);

  await db.insert(usersTable).values({ name: name });

  return NextResponse.json({ message: "user created" }, { status: 200 });
}
