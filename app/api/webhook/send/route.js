import { db } from "@/db/db";
import { events } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { companyId } = await req.json();

  const pt = JSON.stringify({
    amount: "100",
    currency: "USDC",
    test: true,
    createdAt: Date.now(),
  });

  console.log("private test: ", pt);

  await db.insert(events).values({
    companyId,
    eventType: "payment.created",
    payload: JSON.stringify({
      amount: "100",
      currency: "USDC",
      test: true,
      createdAt: Date.now(),
    }),
  });

  return NextResponse.json({ message: "Webhook sent" }, { status: 200 });
}
