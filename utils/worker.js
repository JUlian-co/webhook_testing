import { and, arrayContains, eq, inArray } from "drizzle-orm";
import { db } from "../db/db.js";
import { events, webhookDeliveries, webhookEndpoints } from "../db/schema.js";
import fetch from "node-fetch";
import crypto from "crypto";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* Für echten launch optimieren */

/* TODO: noch machen dass dieses eventType überprüft wird, also beim endpoints fetchen aus der DB */

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
      .where(
        and(
          eq(webhookEndpoints.companyId, event.companyId),
          eq(webhookEndpoints.isActive, 1),
          arrayContains(webhookEndpoints.eventTypes, [event.eventType])
        )
      );
    console.log("esesesesesessss in worker.js: ", endpoints);

    for (const endpoint of endpoints) {
      console.log("endpoint in worker.js: ", endpoint);
      try {
        const res = await fetch(endpoint.url, {
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

        console.log("--------------------------");
        const resJson =
          await res.json(); /* TODO: das heir überprüfen mit echtem endpunkt */
        console.log("res jsonnn: ", resJson);
        console.log("--------------------------");
        // console.log("res jsonnn: ", res.json());

        await db.insert(webhookDeliveries).values({
          eventId: event.id,
          endpointId: endpoint.id,
          status: "success",
          statusCode: res.status,
          responseBody: resJson,
          requestBody: event.payload,
        });
      } catch (e) {
        console.error(e);

        await db.insert(webhookDeliveries).values({
          eventId: event.id,
          endpointId: endpoint.id,
          status: "failed",
          error: String(err),
        });
      }
    }

    await db
      .update(events)
      .set({ processed: 1 })
      .where(eq(events.id, event.id));
  }

  await sleep(2500);
}
