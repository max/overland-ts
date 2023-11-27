import { newConfig } from "@jclem/config";
import z from "zod";

const Config = z.object({
  api: z.object({
    token: z.string(),
  }),
  database: z.object({
    url: z.string(),
  }),
});

const config = newConfig(Config).readEnv();

export default config.parse();
