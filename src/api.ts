import bearer from "@elysiajs/bearer";
import { Elysia } from "elysia";
import { db } from "./db";
import { locations, motions, trackingStats } from "./db/schema";
import config from "./lib/config";
import { UnauthorizedError } from "./lib/error";
import { OverlandSchema, OverlandSchemaType } from "./lib/overland";

export const apiRouter = new Elysia().group("/api", (app) =>
  app
    .use(bearer())
    .on("beforeHandle", ({ bearer }) => {
      if (bearer !== config.api.token) {
        throw new UnauthorizedError("Invalid token");
      }
    })
    .post(
      "/locations",
      async ({ body }: { body: OverlandSchemaType }) => {
        await db.transaction(async (tx) => {
          for (const location of body.locations) {
            const [{ newLocationID }] = await tx
              .insert(locations)
              .values({
                latitude: location.geometry.coordinates[1],
                longitude: location.geometry.coordinates[0],
                createdAt: location.properties.timestamp,
                altitude: location.properties.altitude,
                speed: location.properties.speed,
                horizontalAccuracy: location.properties.horizontal_accuracy,
                verticalAccuracy: location.properties.vertical_accuracy,
                batteryState: location.properties.battery_state,
                batteryLevel: location.properties.battery_level,
                wifi: location.properties.wifi,
                deviceID: location.properties.device_id,
                uniqueID: location.properties.unique_id,
              })
              .returning({ newLocationID: locations.id });

            for (const motion of location.properties.motion) {
              await tx.insert(motions).values({
                locationID: newLocationID,
                type: motion,
              });
            }

            await tx.insert(trackingStats).values({
              locationID: newLocationID,
              pauses: location.properties.pauses,
              activity: location.properties.activity,
              desiredAccuracy: location.properties.desired_accuracy,
              deferred: location.properties.deferred,
              significantChange: location.properties.significant_change,
              locationsInPayload: location.properties.locations_in_payload,
            });
          }
        });
      },
      {
        body: OverlandSchema,
      }
    )
);
