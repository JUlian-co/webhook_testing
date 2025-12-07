import { db } from "@/db/db";
import { webhookEndpoints } from "@/db/schema";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { companyId, name, url } = await req.json();

  const secret = crypto.randomBytes(32).toString("hex");
  console.log("generated secret: ", secret);

  await db.insert(webhookEndpoints).values({
    companyId,
    name,
    secret,
    url,
  });

  return NextResponse.json({ message: "webhook created" }, { status: 201 });
}

export async function GET(req) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("companyId");
  console.log("company id in webhook route: ", companyId);

  const data = await db
    .select()
    .from(webhookEndpoints)
    .where(eq(webhookEndpoints.companyId, companyId));

  console.log("data in webhook route: ", data);

  return NextResponse.json({ message: data }, { status: 200 });
}
