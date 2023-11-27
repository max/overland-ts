import bearer from "@elysiajs/bearer";
import { Elysia } from "elysia";
import { db } from "./db";
import { locations, motions } from "./db/schema";
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
                altitude: location.properties.altitude,
                batteryState: location.properties.battery_state,
                createdAt: location.properties.timestamp,
                deviceID: location.properties.device_id,
                horizontalAccuracy: location.properties.horizontal_accuracy,
                latitude: location.geometry.coordinates[1],
                longitude: location.geometry.coordinates[0],
                speed: location.properties.speed,
                uniqueID: location.properties.unique_id,
                verticalAccuracy: location.properties.vertical_accuracy,
                wifi: location.properties.wifi,
              })
              .returning({ newLocationID: locations.id });

            for (const motion of location.properties.motion) {
              await tx.insert(motions).values({
                locationID: newLocationID,
                type: motion,
              });
            }
          }
        });
      },
      {
        body: OverlandSchema,
      }
    )
);
