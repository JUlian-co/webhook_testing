import { db } from "@/db/db";
import { webhookEndpoints } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  const { endpointId } = await req.json();

  const endpoint = await db
    .select()
    .from(webhookEndpoints)
    .where(eq(webhookEndpoints.id, endpointId))
    .limit(1)
    .then((r) => r[0]);

  console.log("endpoint obj in test wh route: ", endpoint);

  const payload = JSON.stringify({
    eventType: "payment.finalized",
    amount: "100",
    currency: "USDC",
    test: true,
    createdAt: Date.now(),
  });

  const res = await fetch(endpoint.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Signature": crypto
        .createHmac("sha256", endpoint.secret)
        .update(payload)
        .digest("hex"),
    },
    body: payload,
  });

  console.log("res: ", res);

  return NextResponse.json({ message: "webhook sent" }, { status: 200 });
}
