import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  altitude: real("altitude"),
  batteryState: text("battery_state"), // TODO property
  deviceID: text("device_id"), // TODO property
  horizontalAccuracy: real("horizontal_accuracy"),
  speed: real("speed"),
  uniqueID: text("unique_id"), // TODO property
  verticalAccuracy: real("vertical_accuracy"),
  wifi: text("wifi"), // TODO: property
});

export const locationsRelations = relations(locations, ({ many }) => ({
  motions: many(motions),
  properties: many(properties),
}));

export const motions = sqliteTable("motions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  locationID: integer("location_id"),
  type: text("type"),
});

export const motionsRelations = relations(motions, ({ one }) => ({
  location: one(locations, {
    fields: [motions.locationID],
    references: [locations.id],
  }),
}));

export const properties = sqliteTable("properties", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  locationID: integer("location_id"),
  key: text("key"),
  value: text("value"),
});

export const propertiesRelations = relations(properties, ({ one }) => ({
  location: one(locations, {
    fields: [properties.locationID],
    references: [locations.id],
  }),
}));

export type Location = typeof locations.$inferSelect;
export type InsertLocation = typeof locations.$inferInsert;
