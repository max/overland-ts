import type { Config } from "drizzle-kit";
import config from "./src/lib/config";

export default {
  schema: "./src/db/schema.ts",
  driver: "libsql",
  dbCredentials: {
    url: config.database.url,
  },
  verbose: true,
  strict: true,
} satisfies Config;
