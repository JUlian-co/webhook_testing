import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { events, webhookEndpoints } from "../db/schema.js";
import fetch from "node-fetch";
import crypto from "crypto";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* Für echten launch optimieren */

while (true) {
  console.log("WEBHOOK WORKER STARTED");

  const openEvents = await db
    .select()
    .from(events)
    .where(eq(events.processed, 0));

  for (const event of openEvents) {
    console.log("event in worker.js: ", event);
    console.log(typeof event.payload);

    const endpoints = await db
      .select()
      .from(webhookEndpoints)
      .where(eq(webhookEndpoints.companyId, event.companyId));
    console.log("esesesesesessss in worker.js: ", endpoints);

    for (const endpoint of endpoints) {
      console.log("endpoint in worker.js: ", endpoint);
      try {
        await fetch(endpoint.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Signature": crypto
              .createHmac("sha256", endpoint.secret)
              .update(event.payload)
              .digest("hex"),
          },
          body: event.payload,
        });
      } catch (e) {
        console.error(e);
      }
    }

    await db
      .update(events)
      .set({ processed: 1 })
      .where(eq(events.id, event.id));
  }

  await sleep(2500);
}
