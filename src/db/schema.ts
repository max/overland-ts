import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const locations = sqliteTable("locations", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
});

export type Location = typeof locations.$inferSelect;
export type InsertLocation = typeof locations.$inferInsert;
