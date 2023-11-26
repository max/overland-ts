import { t as Type, Static } from "elysia";

const Geometry = Type.Object({
  type: Type.String(),
  coordinates: Type.Array(Type.Number()),
});

enum Motion {
  Driving = "driving",
  Walking = "walking",
  Running = "running",
  Cyling = "cycling",
  Stationary = "stationary",
}

enum Activity {
  AutomotiveNavigation = "automotive_navigation",
  Fitness = "fitness",
  OtherNavigation = "other_navigation",
  Other = "other",
}

const Properties = Type.Object({
  timestamp: Type.String(),
  altitude: Type.Number(),
  speed: Type.Number(),
  horizontal_accuracy: Type.Number(),
  vertical_accuracy: Type.Number(),
  motion: Type.Array(Type.Enum(Motion)),
  pauses: Type.Boolean(),
  activity: Type.Optional(Type.Enum(Activity)),
  desired_accuracy: Type.Optional(Type.Number()),
  deferred: Type.Optional(Type.Number()),
  significant_change: Type.Optional(Type.String()),
  locations_in_payload: Type.Optional(Type.Number()),
  battery_state: Type.Optional(Type.String()),
  battery_level: Type.Optional(Type.Number()),
  device_id: Type.Optional(Type.String()),
  wifi: Type.Optional(Type.String()),
  unique_id: Type.Optional(Type.String()),
});

const Location = Type.Object({
  type: Type.String(),
  geometry: Geometry,
  properties: Properties,
});

export const OverlandSchema = Type.Object({
  locations: Type.Array(Location),
  // TODO: Properly type these two fields
  current: Type.Optional(Type.Any()),
  trip: Type.Optional(Type.Any()),
});

export type OverlandSchemaType = Static<typeof OverlandSchema>;
