import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from ".";
import drizzleConfig from "../../drizzle.config";

await migrate(db, { migrationsFolder: drizzleConfig.out });
