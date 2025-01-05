import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { type ZodError, z } from "zod";

expand(config({ path: ".env.local" }));

// console.log("Loaded Environment Variables: ", process);

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  },
  onValidationError: (error: ZodError) => {
    console.error("Error in Environment Variables: ", error.errors);
    process.exit(1);
  },
  onInvalidAccess: (variable: string) => {
    throw new Error(`Invalid Access to Environment Variable: ${variable}`);
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: true,
});
