import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);

  const name = url.searchParams.get("name");

  // console.log("name in route: ", name);

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, name));

  console.log("user from db: ", user);

  return NextResponse.json({ user }, { status: 200 });
}
