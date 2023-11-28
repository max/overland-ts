import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  createdAt: text("created_at").notNull(), // timestamp
  altitude: integer("altitude").notNull(),
  speed: integer("speed").notNull(),
  horizontalAccuracy: integer("horizontal_accuracy").notNull(),
  verticalAccuracy: integer("vertical_accuracy").notNull(),
  batteryState: text("battery_state").notNull(),
  batteryLevel: real("battery_level").notNull(),
  wifi: text("wifi").notNull(),
  deviceID: text("device_id").notNull(),
  uniqueID: text("unique_id"),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  motions: many(motions),
  trackingStats: many(trackingStats),
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

export const trackingStats = sqliteTable("tracking_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  locationID: integer("location_id"),
  pauses: integer("pauses", { mode: "boolean" }),
  activity: text("activity"),
  desiredAccuracy: integer("desired_accuracy"),
  deferred: integer("deferred"),
  significantChange: text("significant_change"),
  locationsInPayload: integer("locations_in_payload"),
});

export const trackingStatsRelations = relations(trackingStats, ({ one }) => ({
  location: one(locations, {
    fields: [trackingStats.locationID],
    references: [locations.id],
  }),
}));

export type Location = typeof locations.$inferSelect;
export type InsertLocation = typeof locations.$inferInsert;
export type Motion = typeof motions.$inferSelect;
export type InsertMotion = typeof motions.$inferInsert;
export type TrackingStat = typeof trackingStats.$inferSelect;
export type InsertTrackingStat = typeof trackingStats.$inferInsert;
