import type { Config } from "drizzle-kit";
import config from "./src/lib/config";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "libsql",
  dbCredentials: {
    url: config.database.url,
  },
  verbose: true,
  strict: true,
} satisfies Config;
