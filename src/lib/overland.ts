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

enum BatteryState {
  Unknown = "unknown",
  Charging = "charging",
  Full = "full",
  Unplugged = "unplugged",
}

enum Activity {
  AutomotiveNavigation = "automotive_navigation",
  Fitness = "fitness",
  OtherNavigation = "other_navigation",
  Other = "other",
}

enum SignificantChangeOptions {
  Disabled = "disabled",
  Enabled = "enabled",
  Exclusive = "exclusive",
}

const Properties = Type.Object({
  timestamp: Type.String({
    description: "ISO 8601 timestamp",
  }),
  altitude: Type.Number({
    description: "Altitude in meters",
  }),
  speed: Type.Number({
    description: "Speed in meters per second",
  }),
  horizontal_accuracy: Type.Number({
    description: "Accuracy of the position in meters",
  }),
  vertical_accuracy: Type.Number({
    description: "Accuracy of the altitude in meters",
  }),
  motion: Type.Array(Type.Enum(Motion), {
    description: "Array of motion states detected",
  }),
  battery_state: Type.Enum(BatteryState, {
    description: "Battery state",
  }),
  battery_level: Type.Number({
    description: "Value from 0 to 1 indicating the percent battery remaining",
  }),
  wifi: Type.String({
    description: "SSID of the connected WiFi network, or an empty string",
  }),
  device_id: Type.String({
    description: "Device ID configured in settings, or an empty string",
  }),
  unique_id: Type.Optional(
    Type.String({
      description: "Unique ID as set by Apple if setting is enabled",
    })
  ),
});

const TrackingStatsProperties = Type.Partial(
  Type.Object({
    pauses: Type.Boolean({
      description: 'Whether "pauses updates automatically" is enabled',
    }),
    activity: Type.Enum(Activity, {
      description: "Type of activity as set on the settings screen",
    }),
    desired_accuracy: Type.Number({
      description:
        "Requested accuracy in meters as confgirued on the settings screen",
    }),
    deferred: Type.Number({
      description:
        "Distance in meters to defer location updates, configured on the settings screen",
    }),
    significant_change: Type.Enum(SignificantChangeOptions, {
      description: "String indicating the significant change mode",
    }),
    locations_in_payload: Type.Number({
      description:
        "Number of locations sent in the batch along with this location",
    }),
  })
);

const Location = Type.Object({
  type: Type.String(),
  geometry: Geometry,
  properties: Type.Composite([Properties, TrackingStatsProperties]),
});

export const OverlandSchema = Type.Object({
  locations: Type.Array(Location),
  // TODO: Properly type these two fields
  current: Type.Optional(Type.Any()),
  trip: Type.Optional(Type.Any()),
});

export type OverlandSchemaType = Static<typeof OverlandSchema>;
