import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import config from "../lib/config";
import * as schema from "./schema";

const client = createClient({
  url: config.database.url,
});

export const db = drizzle(client, { schema, logger: true });
