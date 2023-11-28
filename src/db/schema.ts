import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  createdAt: text("created_at").notNull(), // timestamp
  altitude: real("altitude").notNull(),
  speed: real("speed").notNull(),
  horizontalAccuracy: real("horizontal_accuracy").notNull(),
  verticalAccuracy: real("vertical_accuracy").notNull(),
  batteryState: text("battery_state").notNull(),
  batteryLevel: text("battery_level").notNull(),
  wifi: text("wifi").notNull(),
  deviceID: text("device_id").notNull(),
  uniqueID: text("unique_id"),
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
